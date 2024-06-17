const { Lga, State } = require("../models");
const { CustomError } = require("../utils/customError");

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
    throw error;
  }
};

const getLgaById = async (lgaId) => {
  try {
    const lga = await Lga.findByPk(lgaId);
    if (!lga) {
      throw new CustomError(`LGA with LGA ID ${lgaId} does not exist`, 200);
    }

    return {
      message: "LGA retrieved successfully",
      data: lga,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

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
  getAllLgas,
  getLgaById,
  getLgaByStateId,
};
