const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const schema = new Schema(
  {
    roomId: {
      type: String,
      required: [true, "must enter requires thing"],
      unique: true,
      trim: true,
    },
    questions: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "question",
        },
        userAnswer: [{ userId: { type: Schema.Types.ObjectId, ref: "user" }, answers: { type: String, default: null }, time: { type: Number, default: -1 }, totalScore: { type: Number, default: 0 } }],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

schema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  delete obj._id;
  return obj;
};

const model = Mongoose.model("room", schema);
module.exports = model;
