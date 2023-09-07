import { useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Proptypes from "prop-types";

import SideBar from "./SideBar/SideBar.jsx";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar.jsx";
import { MessengerComponent as Messenger } from "./Messenger/Messenger.jsx";
import AppBar from "./AppBar/AppBar.jsx";
import { logout } from "../shared/utils/auth.js";
import { getActions } from "../store/actions/authActions.js";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection.js";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

Dashboard.propTypes = {
  setUserDetails: Proptypes.func.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export const DashboardComponent = connect(null, mapActionsToProps)(Dashboard);
