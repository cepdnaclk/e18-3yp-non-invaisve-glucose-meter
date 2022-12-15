// for patients -- mobile app

// authentication middleware
const jwt = require("jsonwebtoken");
const User = require("../models/userPatient");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
    if (error) {
      console.log("JWT Token error: " + error.message);
      return res.status(401).json({ message: error });
    }

    const existing_user = await User.findOne({ email: user.email });

    if (
      !existing_user ||
      JSON.stringify(existing_user.role) !== JSON.stringify(user.role)
    ) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
