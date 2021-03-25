const Controller = require("./Controller");
const RoomService = require("../services/RoomService");
const Room = require("../models/Room");
const { AppError } = require("../helpers/AppError");

const roomService = new RoomService(Room);

class Roomcontroller extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
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
}

module.exports = new Roomcontroller(roomService);
