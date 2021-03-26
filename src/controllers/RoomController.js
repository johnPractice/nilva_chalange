const Controller = require("./Controller");
const RoomService = require("../services/RoomService");
const Room = require("../models/Room");
const { AppError } = require("../helpers/AppError");
const { dirName } = require("../../config");
const WebSockets = require("../utils/socket/webSocket");

const roomService = new RoomService(Room);

class Roomcontroller extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
    this.join = this.join.bind(this);
  }
  async insert(req, res, next) {
    try {
      const { body, user } = req;
      body.createdBy = user._id;
      const item = await this.service.insert(req.body);
      return res.status(201).json(item).end();
    } catch (err) {
      next(err);
    }
  }

  async join(req, res, next) {
    try {
      const { roomId } = req.query;
      const { user } = req;
      if (!roomId) next(new AppError("roomId must enter", 400));
      const result = await this.service.join({ roomId, userId: user._id });
      // add question to client
      // return res.status(200).json(result).end();
      global.io.sockets.emit("join new room", { roomId });
      return res.status(200).json({ message: "joined this room" }).end();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new Roomcontroller(roomService);
