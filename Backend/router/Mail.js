const route = require("express").Router();
const RegisterController = require("../controllers/Register");

route.post("/", RegisterController.MailVerif);

module.exports = route;
