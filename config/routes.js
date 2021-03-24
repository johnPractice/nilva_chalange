const userRoute = require("../src/router/user.route");
const questionRoute = require("../src/router/question.route");
module.exports = (app) => {
  app.use("/user", userRoute);
  app.use("/question", questionRoute);
};
