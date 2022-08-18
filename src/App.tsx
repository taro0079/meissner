import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { ChakraProvider } from "@chakra-ui/react";
import {Button} from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import Form from "./form";
import { useState } from 'react';

function App() {

  const openFileDialog = () => {
    open().then((files) => console.log(files));
  };
  function exeffmpeg() {
    invoke("cut_movie", {start: "00:00:00", end: "00:00:05"});
  }

  function executeCommands() {
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
  const startTime = "";
  const endTime = "";

  return (
    <ChakraProvider>
      <div className="App">
          <div className="text-center">
            <Heading>Meissner</Heading>
            <Text>Extremely simple movie editor</Text>
          </div>
          <Button onClick={openFileDialog}>Click</Button>
          <Button colorScheme='teal' onClick={exeffmpeg}>Click</Button>
          <Form label='Start Time'/>
          <Form label='End Time'/>
      </div>
    </ChakraProvider>
  );
}

export default App;
