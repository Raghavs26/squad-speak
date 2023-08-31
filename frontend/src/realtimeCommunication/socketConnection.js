import io from "socket.io-client";

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  const socket = io.connect("http://localhost:5000", {
    auth: {
      token: jwtToken,
    },
  });
  console.log(socket);
  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("join", userDetails);
  });
};
