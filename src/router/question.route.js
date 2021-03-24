const Router = require("express").Router;
const route = Router();
const QuestionController = require("../controllers/QuestionController");
const protect = require("../utils/jwt/protect");
const questionProtect = require("../utils/question/protect");
route.post("/", protect, QuestionController.insert).get("/", protect, questionProtect, QuestionController.getOne);
route.get("/all", protect, QuestionController.getAll);

module.exports = route;
