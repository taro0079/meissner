import video_file from "./mov_hts-samp001.mp4"
import { Button, VStack, HStack } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import { startTimeAtom, endTimeAtom, dialogPath } from "./myjotai";
import { useAtom } from "jotai";

const MoviePlay = () => {
	const [path, setPath] = useAtom(dialogPath)
	const videoRef = useRef<HTMLVideoElement>(null);
	const playStart = () => {
		console.log(path)
		if (videoRef.current?.src) {
			videoRef.current.src = path;
		}
		videoRef.current?.play();
	}
	const playPause = () => {
		videoRef.current?.pause();
	}
	const playStop = () => {
		videoRef.current?.pause();
		if (videoRef.current?.currentTime) {
			videoRef.current.currentTime = 0;
		}
	}

	return (
		<VStack>
			<div>
				<video src={video_file} width="600" ref={videoRef}>
					<p>test</p>
				</video>
			</div>
			<HStack>
				<Button onClick={playStart}>Play</Button>
				<Button onClick={playPause}>Pause</Button>
				<Button onClick={playStop}>Stop</Button>
			</HStack>
		</VStack>
	)

};

export default MoviePlay
