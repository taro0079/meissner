import {
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button, Box
} from "@chakra-ui/react";
import {FileDialog} from "./types";

type prop = {
    dialog: FileDialog
    path: string
}
const Dialog = (props: prop) => {
  return (
          <HStack>
              <Box width={400}>
                  <FormControl>
                      <FormLabel>Open file</FormLabel>
                      <Input value={props.path}></Input>
                  </FormControl>
              </Box>
              <Box>
                  <Button onClick={props.dialog}>Select</Button>
              </Box>
          </HStack>

  );
};
export default Dialog;
