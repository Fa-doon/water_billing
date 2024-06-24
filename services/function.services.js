const { Function } = require("../models");

const getAllFunctions = async () => {
  try {
    const functions = await Function.findAll();
    if (functions.length === 0) {
      return {
        message: "No functions found in the database",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Functions retrieved successfully",
      data: functions,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getAllFunctions };
