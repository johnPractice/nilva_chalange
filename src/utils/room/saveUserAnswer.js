const Room = require("../../models/Room");
const saveUserAnswer = async ({ data, roomId }) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) return false;
    for (let i = 0; room.questions.length; i++) {
      room.questions[i].userAnswer.push(data[i]);
    }
    await room.save();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = saveUserAnswer;
