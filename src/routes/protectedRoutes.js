const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

router.get("/", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Protected route accessed successfully." });
});

module.exports = router;
