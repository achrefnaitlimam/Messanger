const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  etat: Boolean,
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
