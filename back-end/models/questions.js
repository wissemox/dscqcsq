const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema(
  {
    question: String,
    job: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
    },
    video: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionsSchema);

module.exports = Questions;
