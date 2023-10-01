import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = ({ localStream }) => {
  return (
    <MainContainer>
      <Video
        // stream={screenSharingStream ? screenSharingStream : localStream}
        stream={localStream}
        isLocalStream
      />
      {/* {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))} */}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export const VideosContainerComponent =
  connect(mapStoreStateToProps)(VideosContainer);
