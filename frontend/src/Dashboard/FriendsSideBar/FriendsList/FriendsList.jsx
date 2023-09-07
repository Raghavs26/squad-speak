import { styled } from "@mui/system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FreindsListItemComponent as FriendsListItem } from "./FriendsListItem";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = ({ friends, onlineUsers }) => {
  const checkOnlineUsers = (friends, onlineUsers) => {
    friends.forEach((friend) => {
      const isOnline = onlineUsers.find((user) => {
        return user.userId === friend.id;
      });
      friend.isOnline = isOnline ? true : false;
    });
    return friends;
  };

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((friend) => (
        <FriendsListItem
          username={friend.username}
          id={friend.id}
          key={friend.id}
          isOnline={friend.isOnline}
        />
      ))}
    </MainContainer>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(Object).isRequired,
  onlineUsers: PropTypes.arrayOf(Object).isRequired,
};

FriendsList.defaultProps = {
  friends: [],
  onlineUsers: [],
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export const FriendListComponent = connect(mapStoreStateToProps)(FriendsList);
