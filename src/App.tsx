import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

function App() {
  const openFileDialog = () => {
    open().then((files) => console.log(files));
  };
  function exeffmpeg() {
    invoke("cut_movie");
  }

  function executeCommands() {
    // invoke('simple_command')
    // invoke('command_with_message', {message: 'some message'}).then(message => {
    // console.log('command_with_message', message)
    // })
    // invoke('command_with_object', {message: {field_str: 'some message', field_u32: 12}}).then(message => {
    // console.log('command_with_object', message)
    for (let arg of [1, 2]) {
      invoke("command_with_error", { arg })
        .then((message) => {
          console.log("command_with_error", message);
        })
        .catch((message) => {
          console.error("command_with_error", message);
        });
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={executeCommands}>Click</button>
        <button onClick={openFileDialog}>Click</button>
        <button onClick={exeffmpeg}>Click</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
