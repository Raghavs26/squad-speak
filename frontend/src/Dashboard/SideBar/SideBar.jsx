import { styled } from "@mui/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MainPageButton from "./MainPageButton.jsx";
import CreateRoomButton from "./CreateRoomButton.jsx";
import ActiveRoomButton from "./ActiveRoomButton.jsx";

const MainContainer = styled("div")({
  width: "4.5rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = ({ activeRooms }) => {
  console.log(activeRooms);
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          key={room.roomId}
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          totalParticipants={room.participants.length}
          isUserInRoom={room.isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

SideBar.propTypes = {
  activeRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const SidebarComponent = connect(mapStoreStateToProps)(SideBar);
