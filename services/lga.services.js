const { Lga } = require("../models");
const { CustomError } = require("../utils/customError");

const getLgaByStateId = async (stateId) => {
  try {
    const lgas = await Lga.findAll({ where: { state_id: stateId } });

    if (lgas.length === 0) {
      throw new CustomError(`No LGAs for state found with ID ${stateId}`, 404);
    }

    return {
      message: "LGAs retrieved successfully",
      data: lgas,
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error fetching lgas", error);
    throw error;
  }
};

module.exports = {
  getLgaByStateId,
};
