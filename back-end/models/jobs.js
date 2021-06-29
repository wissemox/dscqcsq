const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    description: String,
    status: String,
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
