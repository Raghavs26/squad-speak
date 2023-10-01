import store from "../store/store";
import {
  setActiveRooms,
  setLocalStream,
  setOpenRoom,
  setRoomDetails,
} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";

export const createNewRoom = () => {
  const successCallback = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
  };

  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallback);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  console.log(data);
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;
  console.log("friends", friends);
  const rooms = [];
  console.log("activeRooms", activeRooms);
  activeRooms.forEach((room) => {
    friends.forEach((friend) => {
      if (friend.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: friend.username });
      }
    });
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
  };
  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCalbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }
  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
