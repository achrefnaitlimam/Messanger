const route = require("express").Router();
const homeController = require("../controllers/Home");
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

route.post("/", verifytoken, homeController.home);
module.exports = route;
