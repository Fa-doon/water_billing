const { errorHandler } = require("../middlewares/error.middleware");
const stateService = require("../services/state.services");

const getAllStates = async (req, res, next) => {
  try {
    const states = await stateService.getAllStates();
    return res.status(states.statusCode).json({
      message: states.message,
      states: states.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllStates,
};
