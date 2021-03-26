const getAllQuestions = require("../room/getQuestions");
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
      const qa = await getAllQuestions(roomId);
      if (!qa) socket.emit(("error", { message: "some thimg wrong" }));
      socket.emit("send question", { index: 0, total: qa.length, question: qa[0] });
      socket.in(roomId).on("get new question", ({ index }) => {
        if (!aq[index]) socket.emit(("error", { message: "not have this index of questions" }));
        socket.emit("send question", { index: index, total: qa.length, question: qa[index] });
      });
    });
  }
}

module.exports = new WebSocket();