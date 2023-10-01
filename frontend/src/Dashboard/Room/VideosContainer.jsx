import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { styled } from "@mui/system";

import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
}) => {
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

VideosContainer.propTypes = {
  localStream: PropTypes.object,
  remoteStreams: PropTypes.array,
  screenSharingStream: PropTypes.object,
};

export const VideosContainerComponent =
  connect(mapStoreStateToProps)(VideosContainer);
