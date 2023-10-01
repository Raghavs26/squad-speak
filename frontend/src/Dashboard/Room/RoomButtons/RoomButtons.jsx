import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { connect } from "react-redux";

import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import CloseRoomButton from "./CloseRoomButton";
import { getActions } from "../../../store/actions/roomActions";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = (props) => {
  const { localStream, isUserJoinedWithOnlyAudio } = props;

  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

RoomButtons.propTypes = {
  localStream: PropTypes.object,
  isUserJoinedWithOnlyAudio: PropTypes.bool,
};

export const RoomButtonsComponent = connect(
  mapStoreStateToProps,
  mapActionsToProps
)(RoomButtons);
