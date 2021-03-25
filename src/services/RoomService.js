const { AppError } = require("../helpers/AppError");
const Service = require("./Service");
/**
 * UserService class
 * @param {MongooseModel} model
 */
class RoomService extends Service {
  constructor(model) {
    super(model);
    this.update = this.update.bind(this);
    this.join = this.join.bind(this);
  }

  async update(id, data) {
    let item = await this.model.findOneAndUpdate({ roomId: id }, data, { new: true }).populate({ path: "questions.question" });
    return item;
  }
  async join({ roomId }) {
    const room = await this.model.findOne({ roomId }).populate({ path: "questions.question" }).select("-questions.userAnswer");
    if (!room) throw new AppError("not found room", 400);
    if (room.questions.length == 0) throw new AppError("no question in this room", 400);
    return room.questions;
  }
}

module.exports = RoomService;
