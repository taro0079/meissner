import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import {ChakraProvider, Spacer, VStack} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import Form from "./form";
import { startTimeAtom, endTimeAtom, dialogPath } from "./myjotai";
import { useAtom } from "jotai";
import Dialog from "./fileDialog";
import {FileDialog} from "./types";


function App() {
  const [path, setPath] = useAtom(dialogPath)
  const openFileDialog: FileDialog = () => {
    open().then((files) => {
      if (Array.isArray(files)){
        setPath("")
      } else if (files === null) {
        setPath("")
      } else {
        setPath(files)
      }
    });
  };
  const exeffmpeg = (startTime: string, endTime: string, path: string) => {
    invoke("cut_movie", { start: startTime, end: endTime, path: path});
  };

  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);

  return (
    <ChakraProvider>
      <Container padding="5">
        <VStack>
          <div className="text-center">
            <Heading>Meissner</Heading>
            <Text>Extremely simple movie editor</Text>
          </div>
          <Spacer />
          <Dialog dialog={openFileDialog} path={path}/>
          <Form label="Start Time" atom={startTimeAtom} />
          <Form label="End Time" atom={endTimeAtom} />
          <Button
              colorScheme="teal"
              onClick={() => exeffmpeg(startTime, endTime, path)}
          >
            Cut!
          </Button>

        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
