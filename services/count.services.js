const { Taxpayer, Building } = require("../models");

const getCounts = async () => {
  try {
    const taxpayerCount = await Taxpayer.count();
    const buildingCount = await Building.count();

    return {
      message: "Counts retrieved successfully",
      data: {
        taxpayers: taxpayerCount,
        buildings: buildingCount,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  getCounts,
};
