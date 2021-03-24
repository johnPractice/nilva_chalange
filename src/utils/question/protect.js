const Question = require("../../models/Question");
const { AppError } = require("../../helpers/AppError");
const protect = async (req, res, next) => {
  try {
    const { user } = req;
    const { _id } = req.query;
    if (!_id) next(new AppError("enter id", 400));
    const q = await Question.findById(_id);
    if (!q) next(new AppError("nothing found"), 400);
    if (q.createdBy.toString() != user._id.toString()) next(new AppError("can not access this source", 401));
    req.question = q;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = protect;
