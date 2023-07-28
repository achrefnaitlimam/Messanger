const User = require("../model/User");
const jwt = require("jsonwebtoken");
const secretKey = "This is a secret";

exports.login = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;

    // Fetch user by name
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({
        success: false,
        Message: "The username you’ve entered doesn’t match any account",
      });
    }

    // Check Password using bcrypt.compare
    const isMatch = (await password) == user.password;

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        Message: "The password you’ve entered is incorrect",
      });
    }

    // If the password matches, generate the JWT token
    const payload = {
      name: name,
    };

    const options = {
      expiresIn: "1h", // Token will expire in 1 hour
      algorithm: "HS256", // HMAC SHA-256 algorithm
    };

    // Create the JWT token
    const token = jwt.sign(payload, secretKey, options);

    // Debug: Check if the token is being generated correctly
    console.log("Generated Token:", token);

    // Send the token in the response
    return res.status(200).header("Authorization", token).json({
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, Message: err.message });
  }
};
