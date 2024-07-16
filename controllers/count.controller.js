const countServices = require("../services/count.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getCounts = async (req, res, next) => {
  try {
    const counts = await countServices.getCounts();
    res.status(counts.statusCode).json({
      message: counts.message,
      countDetails: counts.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getCounts,
};
