const { State } = require("../models");

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
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  getAllStates,
};
