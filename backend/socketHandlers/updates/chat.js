const Conversation = require("../models/conversation");
const {
  getSocketServerInstance,
  getActiveConnections,
} = require("../../serverStore");

const updateChatHistory = async (conversationId, toSpecifiedId = null) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      modal: "User",
      select: "username _id",
    },
  });

  if (conversation) {
    const io = getSocketServerInstance();
    io.to(socket.id).emit("chatHistory", conversation);

    if (toSpecifiedId) {
      return io.to(toSpecifiedId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    //check if user of current conversation are online
    //if yes emit to them update of messages
    conversation.participants.forEach((userId) => {
      const connectedUser = getActiveConnections(userId.toString());
      connectedUser.forEach((sockerId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
