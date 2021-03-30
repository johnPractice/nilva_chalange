const getAllQuestions = require("../room/getQuestions");
const saveUserAnswer = require("../room/saveUserAnswer");

class WebSocket {
  connection(socket) {
    console.log("new user added");
    socket.on("disconnect", () => {
      console.log(socket.id + " left");
      // remove user in global object
      if (global.userConnected[socket.id]) delete global.userConnected[socket.id];
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

      socket.on("end exam", async ({ data, roomId }) => {
        const saveUserAnswerResult = await saveUserAnswer({ data, roomId });
        if (!saveUserAnswerResult) socket.emit(("error", { message: "some thimg wrong" }));
        socket.emit(("save answer", { message: "your answer succesfully" }));
      });
    });
  }
}

module.exports = new WebSocket();
