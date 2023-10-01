import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import PropTypes from "prop-types";

import { createNewRoom } from "../../realtimeCommunication/roomHandler";

const CreateRoomButton = ({ isUserInRoom }) => {
  const createNewRoomHandler = () => {
    createNewRoom();
  };

  return (
    <Button
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
      disabled={isUserInRoom}
    >
      <Add />
    </Button>
  );
};

CreateRoomButton.propTypes = {
  isUserInRoom: PropTypes.bool.isRequired,
};

export default CreateRoomButton;
