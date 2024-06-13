class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

// class BadRequestError extends CustomError {
//   constructor(message) {
//     super(message, 400);
//   }
// }

// class UnauthorizedError extends CustomError {
//   constructor(message = "Bad request") {
//     super(401, message);
//   }
// }

// class InternalServerError extends CustomError {
//   constructor(message = "Internal server error") {
//     super(500, message);
//   }
// }

// class ConflictError extends CustomError {
//   constructor(message = "Conflict") {
//     super(409, message);
//   }
// }

// class NotFoundError extends CustomError {
//   constructor(message = "Not found") {
//     super(404, message);
//   }
// }

module.exports = {
  CustomError,
  // BadRequestError,
  // UnauthorizedError,
  // InternalServerError,
  // ConflictError,
  // NotFoundError,
};
