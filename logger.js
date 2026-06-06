/**
 * Middleware 1: Request Logger
 * Logs method, URL, and timestamp for every incoming request.
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

/**
 * Middleware 2: Response Timer
 * Measures and logs how long each request takes to process.
 */
const responseTimer = (req, res, next) => {
  const start = Date.now();

  // Override res.json to hook into the response lifecycle
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const duration = Date.now() - start;
    res.setHeader("X-Response-Time", `${duration}ms`);
    return originalJson(body);
  };

  next();
};

module.exports = { requestLogger, responseTimer };
