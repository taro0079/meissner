import { Button, VStack, HStack } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { dialogPath, startTimeAtom } from "./myjotai";
import { useAtom } from "jotai";
import { convertFileSrc } from "@tauri-apps/api/tauri";

const convertToSecond = (hours: number, minutes: number, seconds: number) => {
  return hours * 3600 + minutes * 60 + seconds;
};

const parseTime = (time: string) => {
  const splittedTime = time.split(":");
  const hour = Number(splittedTime[0]);
  const minutes = Number(splittedTime[1]);
  const seconds = Number(splittedTime[2]);
  const allTime = convertToSecond(hour, minutes, seconds);
  return allTime;
};

const MoviePlay = () => {
  const [path] = useAtom(dialogPath);
  const [startTime] = useAtom(startTimeAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  // 	videoRef.current?.load();
  // });
  const playStart = () => {
    if (videoRef.current?.currentTime == null) {
      return;
    }
    videoRef.current.currentTime = parseTime(startTime);
    videoRef.current?.play();
  };
  const playPause = () => {
    videoRef.current?.pause();
  };
  const playStop = () => {
    videoRef.current?.pause();
    if (videoRef.current?.currentTime) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <VStack>
      <div>
        <video key={convertFileSrc(path)} width="600" ref={videoRef}>
          <source src={convertFileSrc(path)} />
          <p>test</p>
        </video>
      </div>
      <HStack>
        <Button onClick={playStart}>Play</Button>
        <Button onClick={playPause}>Pause</Button>
        <Button onClick={playStop}>Stop</Button>
      </HStack>
    </VStack>
  );
};

export default MoviePlay;
