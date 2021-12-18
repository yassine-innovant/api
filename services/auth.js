const User = require("../models/user");

const checkUserExists = async (email) => {
  return User.findOne({ email });
};

module.exports = { checkUserExists };
