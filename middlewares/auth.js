const jwt = require("jsonwebtoken");

// authentication middleware
exports.requireLogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      // verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // Attach token to request
      req.user = decode;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized from JWT middleware" });
    }
  } catch (err) {
    console.log("Users' token is not valid");
    return res.status(400).json(err);
  }
};
