const socket = require("socket.io");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id);
    // socket.on("disconnect", () => {
    //   console.log("Client disconnected");
    // });
  });
};

module.exports = { registerSocketServer };
