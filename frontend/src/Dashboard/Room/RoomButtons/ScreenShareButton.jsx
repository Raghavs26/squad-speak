import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { ScreenShare, StopScreenShare } from "@mui/icons-material";

import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.error(
          "error occurred when trying to get an access to screen share stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShare /> : <ScreenShare />}
    </IconButton>
  );
};

ScreenShareButton.propTypes = {
  localStream: PropTypes.object,
  screenSharingStream: PropTypes.object,
  setScreenSharingStream: PropTypes.func,
  isScreenSharingActive: PropTypes.bool,
};

export default ScreenShareButton;
