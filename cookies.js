const express = require("express");
const router = express.Router();

/**
 * GET /set-cookie
 * Sets a cookie named "user" with a value and expiry.
 * Optionally accepts ?name=... query param to customize the cookie value.
 */
router.get("/set-cookie", (req, res) => {
  const username = req.query.name || "GuestUser";

  res.cookie("user", username, {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    httpOnly: true,          // Prevents client-side JS from reading it
    sameSite: "Lax",
  });

  res.json({
    message: "Cookie set successfully",
    cookie: { name: "user", value: username, maxAge: "1 hour" },
  });
});

/**
 * GET /get-cookie
 * Reads all cookies from the incoming request and returns them.
 */
router.get("/get-cookie", (req, res) => {
  const cookies = req.cookies;

  if (Object.keys(cookies).length === 0) {
    return res.status(200).json({
      message: "No cookies found. Visit /set-cookie first.",
      cookies: {},
    });
  }

  res.json({
    message: "Cookies retrieved successfully",
    cookies,
  });
});

/**
 * GET /delete-cookie
 * Clears the "user" cookie by setting its maxAge to 0.
 */
router.get("/delete-cookie", (req, res) => {
  res.clearCookie("user");

  res.json({
    message: "Cookie 'user' deleted successfully",
  });
});

module.exports = router;
