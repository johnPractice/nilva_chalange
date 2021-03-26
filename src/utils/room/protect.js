const Room = require("../../models/Room");
const { AppError } = require("../../helpers/AppError");
const protect = async (req, res, next) => {
  try {
    const { user } = req;
    const { roomId } = req.query;
    if (!roomId) next(new AppError("enter id", 400));
    const room = (await Room.findById({ roomId }).populate({ path: "questions.question" })).populate({ path: "questions.userAnswer.userId" });
    if (!room) next(new AppError("nothing found"), 400);
    if (room.createdBy.toString() != user._id.toString()) next(new AppError("can not access this source", 401));
    req.room = room;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = protect;
