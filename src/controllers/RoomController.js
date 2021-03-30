const Controller = require("./Controller");
const RoomService = require("../services/RoomService");
const Room = require("../models/Room");
const { AppError } = require("../helpers/AppError");
const sortScore = require("../utils/room/sortScore");
const roomService = new RoomService(Room);
const loop = require("../utils/function/loopDelay");

class Roomcontroller extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
    this.join = this.join.bind(this);
    this.score = this.score.bind(this);
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

      // can send question with io in this route
      // const { socketId } = req.body;
      // if (global.userConnected[socketId]) {
      // let i=0;
      // const senddata = (index) => {
      //   global.userConnected[socketId].emit("sent question", { question: result[index] });
      // };
      // loop(result.lenght, i, 10000, senddata);
      //
      //
      // };

      return res.status(200).json({ message: "joined this room" }).end();
    } catch (e) {
      next(e);
    }
  }
  async score(req, res, next) {
    try {
      const { room } = req;
      const { questions } = room;
      if (!questions) next(new AppError("no question in room", 400));
      const result = await sortScore(questions.userAnswer);
      return res.status(200).json({ score: result }).end();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new Roomcontroller(roomService);
