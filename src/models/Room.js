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
    answerUser: {
      type: String,
    },
    questions: [
      {
        testQuestion: {
          type: Schema.Types.ObjectId,
          ref: "TestQuestion",
        },
        LongAnswerQuestion: {
          type: Schema.Types.ObjectId,
          ref: "LongAnswerQuestion",
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    options: [
      {
        option: {
          type: String,
          required: [true, "must enter requires thing"],
        },
      },
    ],
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
