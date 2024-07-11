const { errorHandler } = require("../middlewares/error.middleware");
const sizerangeService = require("../services/sizerange.services");

const getAllSizeRanges = async (req, res, next) => {
  try {
    const sizerange = await sizerangeService.getAllSizeRanges();
    return res.status(sizerange.statusCode).json({
      message: sizerange.message,
      sizeRangeDetails: sizerange.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllSizeRanges,
};
