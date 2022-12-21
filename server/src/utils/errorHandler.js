// Custom Error Catching
export class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Catch Global Error
export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Catch Not Found Page Error
export const notFoundError = (req, res, next) => {
  const error = new ErrorResponse(404, `Not found ${req.originalUrl}`);
  next(error);
};
