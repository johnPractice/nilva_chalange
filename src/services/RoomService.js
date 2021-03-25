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
  }

  async update(id, data) {
    let item = await this.model.findOneAndUpdate({ roomId: id }, data, { new: true }).populate({ path: "questions.question" });
    return item;
  }
}

module.exports = RoomService;
