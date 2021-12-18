const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { checkUserExists } = require("../services/auth");

exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    user = await checkUserExists(email);
    if (user) {
      res.status(400).json({ error: "User already exists" });
    }
    const crypted_password = await bcrypt.hash(password, 10);
    user = new User({ first_name, last_name, email, crypted_password });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error when registering: " + err);
  }
};
