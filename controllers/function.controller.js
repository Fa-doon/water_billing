const functionService = require("../services/function.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getAllFunctions = async (req, res, next) => {
  try {
    const functions = await functionService.getAllFunctions();
    return res.status(functions.statusCode).json({
      message: functions.message,
      functionDetails: functions.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllFunctions,
};
