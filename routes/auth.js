const express = require("express");
const router = express.Router();

//import controllers
const { register, login } = require();

//validators for later on

//routes
router.post("register", register);
router.post("login", login);

module.exports = router;
