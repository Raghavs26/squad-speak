import Peer from "simple-peer";

import store from "../store/store";
import { setLocalStream } from "../store/actions/roomActions";

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

const peers = {};

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    //turn cred
  } else {
    console.warn("using STUN servers");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

export const getLocalStreamPreview = (onlyAudio = false, callBackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callBackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log(
        "error occured while trying to get an access to local stream"
      );
    });
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (signal) => {
    console.log("sending signal to socket server");
    // socketConnection.sendSignal({
    //   connUserSocketId,
    //   signal,
    // });
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("stream received");
    // dispatch action to update remote streams
  });
};
