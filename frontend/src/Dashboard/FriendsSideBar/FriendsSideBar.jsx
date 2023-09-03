import { styled } from "@mui/system";

import AddFriendButton from "./AddFriendButton.jsx";
import FriendsTitle from "./FriendsTitle.jsx";
import { FriendListComponent as FriendsList } from "./FriendsList/FriendsList.jsx";
import { PendingInvitationsListComponent as PendingInvitationsList } from "./PendingInvitationsList/PendingInvitationsList.jsx";

const MainContainer = styled("div")({
  width: "14rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2f3136",
});

const FriendsSideBar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendsSideBar;
