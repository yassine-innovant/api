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
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log("Error when registering: " + err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkUserExists(email);
    console.log("the user OBJECT:" + user);
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.crypted_password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
