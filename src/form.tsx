import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PrimitiveAtom, useAtom } from "jotai";

type prop = {
	label: string;
	atom: PrimitiveAtom<string>;
};

const Form = (props: prop) => {
	const [, setTime] = useAtom(props.atom);

	return (
		<FormControl>
			<FormLabel>{props.label}</FormLabel>
			<Input
				onChange={(event) => setTime(event.target.value)}
				defaultValue={"00:00:00"}
			/>
		</FormControl>
	);
};

export default Form;
