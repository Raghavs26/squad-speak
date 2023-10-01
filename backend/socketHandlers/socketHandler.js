const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const {
  addNewConnectedUser,
  removeConnectedUser,
  addNewActiveRoom,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
  getActiveRooms,
} = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../socketHandlers/updates/friends");
const { updateChatHistory } = require("./updates/chat");
const { updateRooms } = require("./updates/rooms");

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

  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};

const disconnectHandler = (socket) => {
  removeConnectedUser(socket.id);
};

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });
      updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: "DIRECT",
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

const roomCreateHandler = (socket) => {
  console.log("room create handler");
  const socketId = socket.id;
  const { userId } = socket.user;

  const roomDetails = addNewActiveRoom(userId, socketId);

  socket.emit("room-create", {
    roomDetails,
  });

  updateRooms();
};

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = getActiveRoom(roomId);
  joinActiveRoom(roomId, participantDetails);

  // send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  updateRooms();
};

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = getActiveRoom(roomId);

  if (activeRoom) {
    leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    updateRooms();
  }
};

const disconnectRoomHandler = (socket) => {
  const activeRooms = getActiveRooms();

  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );

    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });

  removeConnectedUser(socket.id);
};

const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("conn-init", initData);
};

const roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;
  const signalingData = { signal, connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("conn-signal", signalingData);
};

module.exports = {
  newConnectionHandler,
  disconnectHandler,
  directMessageHandler,
  directChatHistoryHandler,
  roomCreateHandler,
  roomJoinHandler,
  roomLeaveHandler,
  disconnectRoomHandler,
  roomInitializeConnectionHandler,
  roomSignalingDataHandler,
};
