const userRoute = require("../src/router/user.route");
module.exports = (app) => {
  app.use("/user", userRoute);
};
