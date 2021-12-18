const express = require("express");
const router = express.Router();

//import controllers
const { register, login } = require("../controllers/auth");

//validators for later on

//routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
