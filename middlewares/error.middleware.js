const { CustomError } = require("../utils/customError");

const globalErrorHandler = async (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof CustomError) {
    statusCode = err.statusCode || statusCode;
    message = err.message || message;
  }

  res.status(statusCode).json({
    message,
  });
  console.log('error', err)
};

const errorHandler = (error, res, next) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    next(error);
  }
};

module.exports = { globalErrorHandler, errorHandler };
