const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const {
  addNewConnectedUser,
  removeConnectedUser,
  addNewActiveRoom,
} = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../socketHandlers/updates/friends");
const { updateChatHistory } = require("./updates/chat");

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

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { recieverId, content } = data;

    //create new message
    const message = await Message.create({
      content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    //check if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, recieverId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      updateChatHistory(conversation._id.toString());
    } else {
      //perform and update to sender and receiver if person is online
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, recieverId],
      });
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.error(error);
  }
};

const directChatHistoryHandler = async (socket, data) => {
  const { userId } = socket.user;
  const { recieverId } = data;

  const conversation = await Conversation.findOne({
    participants: { $all: [userId, recieverId] },
    type: "DIRECT",
  });

  if (conversation) {
    updateChatHistory(conversation._id.toString(), socket.id);
  }
};

const roomCreateHandler = (socket) => {
  console.log("room create handler");
  const socketId = socket.id;
  const { userId } = socket.user.userId;

  const roomDetails = addNewActiveRoom(userId, socketId);

  socket.emit("room-create", {
    roomDetails,
  });
};

module.exports = {
  newConnectionHandler,
  disconnectHandler,
  directMessageHandler,
  roomCreateHandler,
};
