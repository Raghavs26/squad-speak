import { styled } from "@mui/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PendingInvitationsListItem from "./PendingInvitationsListItem.jsx";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = ({ pendingFriendsInvitations }) => {
  return (
    <MainContainer>
      {pendingFriendsInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};

PendingInvitationsList.propTypes = {
  pendingFriendsInvitations: PropTypes.arrayOf(Object).isRequired,
};
PendingInvitationsList.defaultProps = {
  pendingFriendsInvitations: [],
};

const mapStoreStateToProps = ({ friends }) => {
  console.log("friends", friends);
  return {
    ...friends,
  };
};

export const PendingInvitationsListComponent = connect(mapStoreStateToProps)(
  PendingInvitationsList
);
