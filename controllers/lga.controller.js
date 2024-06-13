const { CustomError } = require("../utils/customError");
const lgaService = require("../services/lga.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getAllLgas = async (req, res, next) => {
  try {
    const lgas = await lgaService.getAllLgas();
    return res.status(lgas.statusCode).json({
      message: lgas.message,
      lgas: lgas.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllLgas,
};
