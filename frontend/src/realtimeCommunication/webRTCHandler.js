import Peer from "simple-peer";

import store from "../store/store";
import * as socketConnection from "./socketConnection";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";

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

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (const socket_id in peers) {
    for (const index in peers[socket_id].streams[0].getTracks()) {
      for (const index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
