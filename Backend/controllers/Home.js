const Room = require("../model/Room");

exports.home = async (req, res) => {
  const Rooms = await Room.find({});
  res.status(200).json(Rooms);
};
