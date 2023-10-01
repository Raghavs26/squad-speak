import { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "0.5rem",
});

const VideoElement = styled("video")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();
  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <MainContainer>
      <VideoElement
        ref={videoRef}
        autoPlay
        muted={isLocalStream ? true : false}
      />
    </MainContainer>
  );
};

export default Video;
