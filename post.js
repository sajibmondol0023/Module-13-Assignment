const express = require("express");
const router = express.Router();

/**
 * POST /register
 * Accepts a JSON body and returns the submitted data.
 * Body: { name, email }
 */
router.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "email"],
      received: req.body,
    });
  }

  res.status(201).json({
    message: "User registered successfully",
    data: { name, email },
  });
});

/**
 * POST /product
 * Reads and returns query parameter from the URL.
 * Example: /product?id=101
 */
router.post("/product", (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: "Missing query parameter",
      example: "/product?id=101",
    });
  }

  res.json({
    message: "Product query received",
    productId: id,
  });
});

/**
 * POST /login
 * Reads username and password from request HEADERS.
 * Headers: username, password
 */
router.post("/login", (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  if (!username || !password) {
    return res.status(401).json({
      error: "Missing credentials in headers",
      required: {
        headers: ["username", "password"],
      },
    });
  }

  res.json({
    message: "Login headers received",
    credentials: {
      username,
      password,
    },
  });
});

module.exports = router;
