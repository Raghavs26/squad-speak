import PropTypes from "prop-types";
import { Button, Tooltip } from "@mui/material";

import Avatar from "../../shared/components/Avatar";
import { joinRoom } from "../../realtimeCommunication/roomHandler";

const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  totalParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRoom = () => {
    if (totalParticipants < 4) {
      joinRoom(roomId);
    }
  };

  const activeRoomButtonDisabled = totalParticipants >= 4;
  const roomTitle = `Creator: ${creatorUsername} | Room ID: ${roomId} | Total Participants: ${totalParticipants}}`;
  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "1rem",
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: "10px",
            color: "#fff",
            backgroundColor: "#5865F2",
          }}
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar username={creatorUsername} />
        </Button>
      </div>
    </Tooltip>
  );
};

ActiveRoomButton.prototypes = {
  creatorUsername: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  totalParticipants: PropTypes.number.isRequired,
  isUserInRoom: PropTypes.bool.isRequired,
};

ActiveRoomButton.defaultProps = {
  creatorUsername: "",
  roomId: "",
  totalParticipants: 0,
  isUserInRoom: false,
};

export default ActiveRoomButton;
