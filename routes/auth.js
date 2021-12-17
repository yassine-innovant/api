const express = require("express");
const router = express.Router();

//import controllers
const { register } = require("../controllers/auth");

//validators for later on

//routes
router.post("/register", register);
router.get("/", () => "hello world");

module.exports = router;
