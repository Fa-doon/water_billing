const { State } = require("../models");
const { CustomError } = require("../utils/customError");

const getAllStates = async () => {
  try {
    const states = await State.findAll();

    if (states.length === 0) {
      return {
        message: "No states found",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "States retrieved successfully",
      data: states,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getStateById = async (stateId) => {
  try {
    const state = await State.findByPk(stateId);
    if (!state) {
      throw new CustomError(`State with ID ${stateId} does not exist`, 404);
    }

    return {
      message: `State retrieved successfully`,
      data: state,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllStates,
  getStateById,
};
