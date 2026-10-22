function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV === 'development';

  // Log error internally but do not expose details to client
  console.error('[Error]', err.message);
  if (isDev) console.error(err.stack);

  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'An unexpected error occurred. Please try again later.' : err.message
  });
}

module.exports = { errorHandler };
