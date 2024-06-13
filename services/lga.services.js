const { Lga } = require("../models");

const getAllLgas = async () => {
  try {
    const lgas = await Lga.findAll();

    if (lgas.length === 0) {
      return {
        message: "No LGAs found in the database",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "LGAs retrieved successfully",
      data: lgas,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  getAllLgas,
};
