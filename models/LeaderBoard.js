const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerID: { type: String, required: true },
  playerName: { type: String, required: true },
  chips: String,
  date: { type: Date, default: Date.now }
});

const LeaderBoard = mongoose.model("LeaderBoard", playerSchema);

module.exports = LeaderBoard;
