const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Token is valid; attach the user payload to the request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

// const express = require("express");
// const authenticateToken = require("../middlewares/auth");

// const router = express.Router();

// router.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "You have access to this route!", user: req.user });
// });

// module.exports = router;