const User = require("../model/User");
const Room = require("../model/Room");
const Chat = require("../model/Chat");

exports.AddRoom = async (req, res) => {
  const newRoom = new Room({
    name: req.body.name,
    nbrP: req.body.nbrP,
    etat: true,
  });
  await newRoom.save();
  return res
    .status(200)
    .json({ success: true, message: "Room added Success." });
};

exports.Room = async (req, res) => {
  const room = await Room.find({ name: req.params.RoomName });
  res.status(200).json(room);
};

exports.AddUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    const room = await Room.findOne({ name: req.body.room_name });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }
    const isUserInRoom = room.users.some((u) => u._id.equals(user._id));
    if (!isUserInRoom) {
      room.users.push(user);
      await room.save();
    }
    res
      .status(200)
      .json({ success: true, message: "User added successfully." });
  } catch (error) {
    console.error("Error adding user to room:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.AddMsg = async (req, res) => {
  try {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const time = hours + ":" + minutes;
    const room = await Room.findOne({ name: req.body.room_name });
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }
    const msg = new Chat({
      message: req.body.msg,
      date: time,
      user: req.body.name,
    });
    room.chat.push(msg);
    await room.save();
    res
      .status(200)
      .json({ success: true, message: "Message added successfully." });
  } catch (error) {
    console.error("Error adding Message to room:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
exports.GetRoom = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const rooms = await Room.find({});
    const userRooms = rooms.filter((room) =>
      room.users.some((u) => u._id.equals(user._id))
    );
    const roomNames = userRooms.map((room) => room.name);

    res.status(200).json({
      success: true,
      message: "Rooms fetched",
      data: roomNames,
    });
  } catch (err) {
    console.log(`Err: ${err}`);
    res.status(500).json({
      success: false,
      message: `Something went wrong! ${err}`,
    });
  }
};
