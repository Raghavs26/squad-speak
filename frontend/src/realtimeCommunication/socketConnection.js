import io from "socket.io-client";
import { setPendingFriendsInvitations } from "../store/actions/friendsActions";
import store from "../store/store";


export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  const socket = io("http://localhost:5000", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    console.log("pendingInvitations", pendingInvitations);
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });
};
