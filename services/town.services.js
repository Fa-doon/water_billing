const { Town } = require("../models");
const { CustomError } = require("../utils/customError");

const getTownByLgaId = async (lgaId) => {
  try {
    const towns = await Town.findAll({ where: { lga_id: lgaId } });

    if (towns.length === 0) {
      throw new CustomError(`No towns with LGA ID ${lgaId} found`, 404);
    }

    return {
      message: "Town retrieved successfully",
      data: towns,
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error retrieving towns", error);
    throw error;
  }
};

module.exports = { getTownByLgaId };
