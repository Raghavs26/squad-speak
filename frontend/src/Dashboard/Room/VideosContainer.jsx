import { styled } from "@mui/system";
import { connect } from "react-redux";


const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = () => {
  return (
    <MainContainer>
      {/* <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
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
