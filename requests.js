const express = require("express");
const router = express.Router();

/**
 * GET /search
 * Accepts URL query parameters and returns them as JSON.
 * Example: /search?name=Monib&course=MERN
 */
router.get("/search", (req, res) => {
  const query = req.query;

  // Respond with 400 if no query parameters provided
  if (Object.keys(query).length === 0) {
    return res.status(400).json({
      error: "No query parameters provided",
      example: "/search?name=Monib&course=MERN",
    });
  }

  res.json({
    message: "Search query received",
    queryParams: query,
  });
});

module.exports = router;
