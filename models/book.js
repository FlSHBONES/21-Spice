const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  playerID: { type: String, required: true },
  playerName: { type: String, required: true },
  chips: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
