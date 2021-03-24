const Router = require("express").Router;
const route = Router();
const QuestionController = require("../controllers/QuestionController");
const protect = require("../utils/jwt/protect");
route.post("/", protect, QuestionController.insert);

module.exports = route;
