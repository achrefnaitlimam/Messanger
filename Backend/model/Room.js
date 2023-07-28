const mongoose = require("mongoose");
const Chat = require("./Chat");
const User = require("./User");

const roomsSchema = new mongoose.Schema({
  name: String,
  nbrP: Number,
  etat: Boolean,
  users: [{ type: mongoose.Schema.Types.Mixed, ref: "User" }],
  chat: [{ type: mongoose.Schema.Types.Mixed, ref: "Chat" }],
});

const Room = mongoose.model("Room", roomsSchema);

module.exports = Room;
