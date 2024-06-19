const purposeService = require("../services/purpose.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getAllPurposes = async (req, res, next) => {
  try {
    const purposes = await purposeService.getAllPurposes();
    return res.status(purposes.statusCode).json({
      message: purposes.message,
      purposeDetails: purposes.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllPurposes,
};
