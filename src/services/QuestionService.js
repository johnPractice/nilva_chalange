const { AppError } = require("../helpers/AppError");
const Service = require("./Service");
/**
 * UserService class
 * @param {MongooseModel} model
 */
class QuestionService extends Service {
  constructor(model) {
    super(model);
  }
}

module.exports = QuestionService;
