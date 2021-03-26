const Room = require("../../models/Room");

const getQuestionsInRoom = async (roomId) => {
  try {
    const questions = await Room.findOne({ roomId }).populate({ path: "questions.question" }).select("-questions.userAnswer");
    if (!questions) return false;
    return questions;
  } catch (e) {
    console.error(e);
    return false;
  }
};
module.exports = getQuestionsInRoom;
