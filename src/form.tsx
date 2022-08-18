import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import { Atom, PrimitiveAtom, useAtom } from 'jotai'
import { startTimeAtom } from './myjotai'

type prop = {
    label: string
    atom: PrimitiveAtom<string>
}


const Form = (props: prop) => {
    const [_, setTime] = useAtom(props.atom)

    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <Input 
            onChange={(event) => setTime(event.target.value)}
            />
            <FormHelperText>Input {props.label}</FormHelperText>
        </FormControl>
    );

}

export default Form