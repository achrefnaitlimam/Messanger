const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const registerRoute = require("./router/Register.js");
const loginRoute = require("./router/Login.js");
const MailVerifRoute = require("./router/Mail.js");
const HomeRoute = require("./router/Home.js");
const RoomRoute = require("./router/Room.js");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: true,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Dashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected!");

  const activeUsers = new Map(); // Map to store active users and their socket connections
  socket.on("send_message", (data) => {
    // Broadcast the message to all connected users, including the sender
    io.emit("send_message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected!");

    const userId = Array.from(activeUsers.entries()).find(
      ([id, s]) => s === socket
    )?.[0];

    if (userId) {
      activeUsers.delete(userId);
      // Notify other connected users that a user has left
      socket.broadcast.emit("user-left", userId);
    }
  });
});

app.use("/", HomeRoute);
app.use("/Register", registerRoute);
app.use("/Login", loginRoute);
app.use("/MailVerif", MailVerifRoute);
app.use("/Room", RoomRoute);

const port = 5000; // Define the port number as a constant for easier management
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
