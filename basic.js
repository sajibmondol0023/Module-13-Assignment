const express = require("express");
const router = express.Router();

/**
 * GET /welcome
 * Returns a simple string response.
 */
router.get("/welcome", (req, res) => {
  res.send("Welcome to Express Learning");
});

/**
 * GET /student
 * Returns a JSON object with student data.
 */
router.get("/student", (req, res) => {
  res.json({
    name: "John",
    course: "MERN Stack",
    batch: 13,
  });
});

module.exports = router;
