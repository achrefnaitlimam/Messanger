const route = require("express").Router();
const RoomController = require("../controllers/Room");
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "Error: Token missing" });
  }

  // Verify the token
  jwt.verify(token, "This is a secret", (err, decoded) => {
    if (err) {
      // Token is either expired or invalid
      return res.status(401).json({ msg: "Error: Token expired or invalid" });
    }

    // Token is valid
    // You can also check the decoded data if needed
    // For example: const userId = decoded.userId;

    next();
  });
};
route.post("/addRoom", verifytoken, RoomController.AddRoom);
route.post("/addUserRoom", verifytoken, RoomController.AddUser);
route.post("/addMsgRoom", verifytoken, RoomController.AddMsg);
route.post("/getRoom", verifytoken, RoomController.GetRoom);
route.post("/:RoomName", verifytoken, RoomController.Room);

module.exports = route;
