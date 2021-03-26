const Room = require("../../models/Room");
class WebSocket {
  connection(socket) {
    console.log("new user added");
    socket.on("disconnect", () => {
      console.log(socket.id + " left");
    });
    // add new user to room
    socket.on("join room", async ({ roomId, userId }) => {
      if (!userId || roomId) socket.emit("error", { message: "enter neccesery property" });
      global.userConnected[userId] = socket;
      socket.join(roomId);
      global.userConnected[userId].emit("join room status", { message: "ok" });
    });
  }
}

module.exports = new WebSocket();
