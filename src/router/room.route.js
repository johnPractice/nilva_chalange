const Router = require("express").Router;
const route = Router();
const RoomController = require("../controllers/RoomController");
const protect = require("../utils/jwt/protect");
const roomProtect = require("../utils/room/protect");

route.post("/", protect, RoomController.insert).put("/", protect, RoomController.update);
route.get("/join", RoomController.join);
route.get("/score", protect, roomProtect);

// route.get("/join", protect, RoomController.join);
module.exports = route;
