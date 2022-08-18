import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',

	testEnvironment: 'jsdom',

	moduleNameMapper: {
		'^.+\\.(s?css|svg)$': '<rootDir>/src/__mocks__/assetMock.ts',
	},
};

export default config;
