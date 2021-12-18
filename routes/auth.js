const express = require("express");
const router = express.Router();

//import controllers
const { register, login } = require("../controllers/auth");
const { requireLogin } = require("../middlewares/auth");
const { home } = require("../controllers/home");
//validators for later on

//routes
router.post("/register", register);
router.post("/login", login);
router.get("/", requireLogin, home);

module.exports = router;
