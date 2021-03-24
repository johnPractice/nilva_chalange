const Controller = require("./Controller");
const QuestionService = require("../services/QuestionService");
const Question = require("../models/Question");
const { AppError } = require("../helpers/AppError");

const questionService = new QuestionService(Question);

class Questioncontroller extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
    this.getOne = this.getOne.bind(this);
  }
  async insert(req, res, next) {
    try {
      const { body, user } = req;
      body.createdBy = user._id;
      const item = await this.service.insert(req.body);
      return res.status(201).json(item).end();
    } catch (err) {
      next(err);
    }
  }
  async getOne(req, res, next) {
    try {
      const { question } = req;
      return res.status(201).json(question).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Questioncontroller(questionService);
