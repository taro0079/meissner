import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { invoke } from '@tauri-apps/api/tauri';
import { mockIPC, mockWindows } from '@tauri-apps/api/mocks';

import { randomFillSync } from 'node:crypto';
import App from '../App';


beforeAll(() => {
	window.crypto = {
		getRandomValues: (buffer: NodeJS.ArrayBufferView) => {
			return randomFillSync(buffer);
		},
	};
});

test('render App component', async () => {
	mockWindows('main');

	mockIPC((cmd,args)=>{
		if (cmd ==='add') {
			return (args.a as number) + (args.b as number);
		}
	});
})

render(<App />);
await userEvent.click(screen.getByRole('button', {name:'count is 0'}));
const spy = jest.spyOn(window, '__TAURI_IPC__');

expect(invoke('add', {a:1,b:1})).resolves.toBe(2);
await userEvent.click(screen.getByRole('button',{name:'Add'}));
expect(spy).toHaveBeenCalledTimes(2);

const {getCurrent} = await import('@tauri-apps/api/window');
expect(getCurrent()).toHaveProperty('label', 'main');