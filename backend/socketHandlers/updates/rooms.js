const {
  getActiveRooms,
  getSocketServerInstance,
} = require("../../serverStore");

const updateRooms = (toSpecifiedScoketId = null) => {
  const io = getSocketServerInstance();
  const activeRooms = getActiveRooms();
  if (toSpecifiedScoketId) {
    io.to(toSpecifiedScoketId).emit("active-rooms", { activeRooms });
  } else {
    io.emit("active-rooms", { activeRooms });
  }
};

module.exports = { updateRooms };
