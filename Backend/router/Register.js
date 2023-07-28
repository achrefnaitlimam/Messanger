const route = require("express").Router();
const RegisterController = require("../controllers/Register");

route.post("/", RegisterController.registerpage);

module.exports = route;
