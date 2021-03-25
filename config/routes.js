const userRoute = require("../src/router/user.route");
const questionRoute = require("../src/router/question.route");
const rommRoute = require("../src/router/room.route");
module.exports = (app) => {
  app.use("/user", userRoute);
  app.use("/question", questionRoute);
  app.use("/room", rommRoute);
};
