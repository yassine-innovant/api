const express = require("express");
const router = express.Router();

//import controllers
const { register, login } = require("../controllers/auth");
const { requireLogin } = require("../middlewares/auth");
const { home } = require("../controllers/home");

//validators for later on
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/auth");

//routes
router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);
router.get("/", requireLogin, home);

module.exports = router;
