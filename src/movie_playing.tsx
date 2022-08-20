import video_file from "./mov_hts-samp001.mp4"
import { Button, VStack, HStack } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'

const MoviePlay = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playStart = () => {
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
