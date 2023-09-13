import store from "../store/store";
import { setOpenRoom } from "../store/actions/roomActions";

export const createNewRoom = () => {
  store.disptach(setOpenRoom(true, true));
};
