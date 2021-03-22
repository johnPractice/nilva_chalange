const userRoute = require("./router/user.route");
module.exports = (app) => {
  app.use("/user", userRoute);
};
