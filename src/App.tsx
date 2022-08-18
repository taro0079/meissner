import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import Form from "./form";
import { startTimeAtom, endTimeAtom } from "./myjotai";
import { useAtom } from "jotai";
import Dialog from "./fileDialog";

function App() {
  const openFileDialog = () => {
    open().then((files) => console.log(files));
  };
  const exeffmpeg = (startTime: string, endTime: string) => {
    invoke("cut_movie", { start: startTime, end: endTime });
  };

  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);

  return (
    <ChakraProvider>
      <Container padding="5">
        <div className="App">
          <div className="text-center">
            <Heading>Meissner</Heading>
            <Text>Extremely simple movie editor</Text>
          </div>
          <Button onClick={openFileDialog}>Open File</Button>
          <Button
            colorScheme="teal"
            onClick={() => exeffmpeg(startTime, endTime)}
          >
            Cut!
          </Button>
          <Form label="Start Time" atom={startTimeAtom} />
          <Form label="End Time" atom={endTimeAtom} />
          <Dialog />
        </div>
      </Container>
    </ChakraProvider>
  );
}

export default App;
