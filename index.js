const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const basicRoutes = require("./routes/basic");
const requestRoutes = require("./routes/requests");
const postRoutes = require("./routes/post");
const cookieRoutes = require("./routes/cookies");
const uploadRoutes = require("./routes/upload");
const { requestLogger, responseTimer } = require("./middleware/logger");

const app = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());                        // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());                         // Parse cookies
app.use(requestLogger);                          // Custom logger
app.use(responseTimer);                          // Custom response timer

// Serve uploaded files statically
app.use("/files", express.static(path.join(__dirname, "uploads")));

// ─── Root Route ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

// ─── Route Modules ────────────────────────────────────────────
app.use("/", basicRoutes);
app.use("/", requestRoutes);
app.use("/", postRoutes);
app.use("/", cookieRoutes);
app.use("/", uploadRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log("─────────────────────────────────────────");
  console.log("Available Routes:");
  console.log(`  GET  /              → Root`);
  console.log(`  GET  /welcome       → Simple string response`);
  console.log(`  GET  /student       → JSON response`);
  console.log(`  GET  /search        → Query params`);
  console.log(`  POST /register      → JSON body`);
  console.log(`  POST /product       → Query param`);
  console.log(`  POST /login         → Header auth`);
  console.log(`  GET  /set-cookie    → Set a cookie`);
  console.log(`  GET  /get-cookie    → Read cookies`);
  console.log(`  GET  /delete-cookie → Delete a cookie`);
  console.log(`  POST /upload        → File upload`);
  console.log("─────────────────────────────────────────");
});
