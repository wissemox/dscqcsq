const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  nom: String,
  prenom: String,
  email: String,
  telephone: String,
  video: String,
  interview: {
    type: Schema.Types.ObjectId,
    ref: "Interview",
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
  },
});

module.exports = mongoose.model("Video", videoSchema);
