const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const schema = new Schema(
  {
    question: {
      type: String,
      required: [true, "must enter requires thing"],
    },
    type: {
      type: String,
      enum: ["TEST", "LQ"],
      required: [true, "must enter requires thing"],
    },
    answerUser: {
      type: String,
    },
    answer: {
      type: String,
      required: [true, "must enter requires thing"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    options: [
      {
        option: {
          type: String,
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

const model = Mongoose.model("question", schema);
module.exports = model;
