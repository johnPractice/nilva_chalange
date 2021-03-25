const Router = require("express").Router;
const route = Router();
const RoomController = require("../controllers/RoomController");
const protect = require("../utils/jwt/protect");
route.post("/", protect, RoomController.insert);

module.exports = route;
