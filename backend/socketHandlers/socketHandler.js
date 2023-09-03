const { addNewConnectedUser, removeConnectedUser } = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../socketHandlers/updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update friends pending invitations
  updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);
};

const disconnectHandler = (socket) => {
  removeConnectedUser(socket.id);
};

module.exports = { newConnectionHandler, disconnectHandler };
