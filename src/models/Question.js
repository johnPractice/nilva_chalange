const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { AppError } = require("../helpers/AppError");

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

// pre save check
schema.pre("save", function () {
  const question = this;
  if (question.type == "TEST" && question.options.length == 0) throw new AppError("in test question must add option", 400);
});

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
