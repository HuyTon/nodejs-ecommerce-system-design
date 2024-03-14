const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  // Try to get token from authorization of header
  let token = req.headers.authorization?.split(" ")[1];

  // Try to get token from 'x-api-key' of header
  if (!token && req.header("x-api-key")) {
    token = req.header("x-api-key");
  }

  // Try to get token from cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication token required!" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
      if (error) {
        return res.json({ status: false });
      } else {
        const user = await User.findById(data.userId);
        if (!user) {
          return res.status(404).json({ message: "User not found!" });
        }
        req.user = user;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = { authenticate };
