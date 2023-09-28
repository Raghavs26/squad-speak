import { useState } from "react";

import { IconButton } from "@mui/material";
import { ScreenShare, StopScreenShare } from "@mui/icons-material";

const ScreenShareButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const handleToggleScreenShare = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };
  return (
    <IconButton onClick={handleToggleScreenShare} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShare /> : <ScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;
