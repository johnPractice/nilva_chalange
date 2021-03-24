const Router = require("express").Router;
const route = Router();
const UserController = require("../controllers/UserController");
const protect = require("../utils/jwt/protect");

route.post("/signup", UserController.signUp);
route.post("/login", UserController.login);
route.post("/logout", protect, UserController.logout);
route.post("/logoutall", protect, UserController.logoutAll);

module.exports = route;
