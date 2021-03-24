const { AppError } = require("../helpers/AppError");
const Service = require("./Service");
/**
 * UserService class
 * @param {MongooseModel} model
 */
class QuestionService extends Service {
  constructor(model) {
    super(model);
    this.getAll = this.getAll.bind(this);
  }
  async getAll(userId, query) {
    let { skip, limit } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    delete query.skip;
    delete query.limit;

    // if (query._id) query._id = new mongoose.mongo.ObjectId(query._id);
    let items = await this.model.find({ createdBy: userId }).skip(skip).limit(limit);
    let total = await this.model.find({ createdBy: userId }).countDocuments();

    return { items, total };
  }
}

module.exports = QuestionService;
