const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  message: String,
  date: String,
  user: String,
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
