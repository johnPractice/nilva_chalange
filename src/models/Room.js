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
        userAnswer: [{ userId: { type: Schema.Types.ObjectId, ref: "user" }, answer: { type: String, default: null } }],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
