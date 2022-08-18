import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
const Dialog = () => {
  return (
    <HStack>
      <FormControl>
        <FormLabel>Open file</FormLabel>
        <Input></Input>
      </FormControl>
      <Button>Select</Button>
    </HStack>
  );
};
export default Dialog;
