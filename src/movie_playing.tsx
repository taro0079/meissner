import { Button, VStack, HStack } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { dialogPath } from "./myjotai";
import { useAtom } from "jotai";
import { convertFileSrc } from "@tauri-apps/api/tauri";

const MoviePlay = () => {
  const [path] = useAtom(dialogPath);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.load();
  });
  const playStart = () => {
    // TODO: startとendで指定した区間のみを再生する
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
