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
