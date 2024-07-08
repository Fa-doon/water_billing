const buildingServices = require("../services/building.services");
const { errorHandler } = require("../middlewares/error.middleware");

const createBuilding = async (req, res, next) => {
  try {
    const buildingData = req.body;
    console.log("Hello");

    const building = await buildingServices.createBuilding(buildingData);

    return res.status(building.statusCode).json({
      message: building.message,
      buildingDetails: building.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getAllBuildings = async (req, res, next) => {
  try {
    const buildings = await buildingServices.getAllBuildings();

    return res.status(buildings.statusCode).json({
      message: buildings.message,
      buildingDetails: buildings.data,
      count: buildings.count,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const updateBuilding = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateDetails = req.body;
    const building = await buildingServices.updateBuilding(id, updateDetails);

    return res.status(200).json({
      message: building.message,
      buildingDetails: building.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  createBuilding,
  getAllBuildings,
  updateBuilding,
};
