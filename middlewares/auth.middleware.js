const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/customError");
const { errorHandler } = require("./error.middleware");
const { Admin } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const body = req.headers.authorization;

    if (!body) {
      throw new CustomError("Unauthorized, not token provided", 401);
    }

    const token = body.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new CustomError("Forbidden - invalid or expired token", 403);
    }

    const admin = await Admin.findOne({ where: { id: decoded.id } });

    if (!admin) {
      throw new CustomError("Unauthorized", 401);
    }

    req.user = admin;
    next();
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  isAdmin,
};
