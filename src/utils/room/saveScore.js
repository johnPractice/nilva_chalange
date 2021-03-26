const Room = require("../../models/Room");
const { AppError } = require("../../helpers/AppError");
const saveScore = async (roomId) => {
  try {
    //   asume the long anser just include that text
    let i = 0;
    const data = await Room.findById({ roomId }).populate({ path: "questions.question" });
    if (!data) next(new AppError("nothing found"), 400);
    data.questions.forEach((item) => {
      const type = item.question.type;
      const userAnswer = item.userAnswer[i].answers;
      const answer = item.question.answer;
      if (type == "LQ") {
        if (checkLong(answer, userAnswer)) {
          item.userAnswer[i].totalScore = item.userAnswer[i].totalScore + 1;
        }
      } else {
        if (answer == userAnswer) item.userAnswer[i].totalScore = item.userAnswer[i].totalScore + 1;
      }
      i++;
    });
    await data.save();
    return data.questions.userAnswer;
  } catch (e) {
    console.error(e);
    throw new AppError("some thing wrong", 500);
  }
};

// create function for check long question answer
// can add extra logic
function checkLong(answer, userAnswer) {
  return answer.includes(userAnswer);
}
