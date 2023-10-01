import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "3px",
  right: "10px",
});

const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={handleRoomResize}>
        {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
      </IconButton>
    </MainContainer>
  );
};

ResizeRoomButton.propTypes = {
  isRoomMinimized: PropTypes.bool.isRequired,
  handleRoomResize: PropTypes.func.isRequired,
};

export default ResizeRoomButton;
