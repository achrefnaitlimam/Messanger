const User = require("../model/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail, SendGrid, etc
  port: 465,
  secure: true,
  secureConnection: false,
  logger: true,
  debug: true,
  auth: {
    user: "achreflimam22@gmail.com",
    pass: "byxyexdmtvdkjzxt",
  },
  tls: {
    rejectUnauthorized: true,
  },
});
const verificationCode = randomstring.generate({
  length: 6,
  charset: "numeric",
});
exports.registerpage = async (req, res, next) => {
  try {
    const existingMail = await User.findOne({ email: req.body.email });
    const existingUser = await User.findOne({ name: req.body.name });

    if (existingMail) {
      return res.status(400).json({
        success: false,
        message: "Email address is already taken",
      });
    } else if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    } else {
      // Create New User

      // Compose the email message
      const mailOptions = {
        from: "achreflimam22@gmail.com",
        to: req.body.email,
        subject: "Verification Code",
        text: `Your verification code is: ${verificationCode}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: verificationCode });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

exports.MailVerif = async (req, res, next) => {
  try {
    const Code = await req.body.Code;
    if (Code == verificationCode) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        etat: true,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Confirmation Success." });
    } else {
      return res.status(400).json({
        success: false,
        message: "Confirmation failed.",
      });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      success: false,
      message: "Confirmation failed. Please try again.",
    });
  }
};
