const { Purpose } = require("../models");

const getAllPurposes = async () => {
  try {
    const purposes = await Purpose.findAll();

    if (purposes.length === 0) {
      return {
        message: "No purposes found in the database",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Purposes retrieved successfully",
      data: purposes,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = { getAllPurposes };
