const Controller = require("./Controller");
const QuestionService = require("../services/QuestionService");
const Question = require("../models/Question");
const { AppError } = require("../helpers/AppError");

const questionService = new QuestionService(Question);

class Questioncontroller extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new Questioncontroller(questionService);
