const route = require("express").Router();
const LoginController = require("../controllers/Login");

route.post("/", LoginController.login);

module.exports = route;
