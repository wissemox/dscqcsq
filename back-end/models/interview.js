const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema(
  {
    url: String,
    job: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
