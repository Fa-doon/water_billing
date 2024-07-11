const { Size_range } = require("../models");

const getAllSizeRanges = async () => {
  try {
    const sizeRanges = await Size_range.findAll();

    if (sizeRanges.length === 0) {
      return {
        message: "No size ranges found",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Size ranges retrieved successfully",
      data: sizeRanges,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured");
    throw error;
  }
};

module.exports = {
  getAllSizeRanges,
};
