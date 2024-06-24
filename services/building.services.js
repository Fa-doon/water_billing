const {
  Building,
  Taxpayer,
  Function,
  Purpose,
  State,
  Lga,
  Town,
} = require("../models");
const { CustomError } = require("../utils/customError");

const existingFields = async (model, field, value, name) => {
  const entity = await model.findOne({ where: { [field]: value } });
  if (!entity) {
    throw new CustomError(
      `${name} with ${field} ${value}, does not exist`,
      404
    );
  }
};

const createBuilding = async (buildingData) => {
  try {
    // checking that the values exist in the DB
    await Promise.all([
      existingFields(Taxpayer, "id", buildingData.taxpayer_id, "Taxpayer"),
      existingFields(State, "id", buildingData.state_id, "State"),
      existingFields(Lga, "id", buildingData.lga_id, "Lga"),
      existingFields(Town, "id", buildingData.town_id, "Town"),
      existingFields(Function, "id", buildingData.function_id, "Function"),
      existingFields(Purpose, "id", buildingData.purpose_id, "Purpose"),
    ]);

    const building = await Building.findOne({
      where: {
        name: buildingData.name,
        address: buildingData.address,
        street: buildingData.street,
        state_id: buildingData.state_id,
        town_id: buildingData.town_id,
        lga_id: buildingData.lga_id,
        size: buildingData.size,
      },
    });

    if (building) {
      throw new CustomError(
        `Building with the provided details already exists`,
        409
      );
    }

    const createdBuilding = await Building.create({
      name: buildingData.name,
      address: buildingData.address,
      street: buildingData.street,
      function_id: buildingData.function_id,
      state_id: buildingData.state_id,
      town_id: buildingData.town_id,
      lga_id: buildingData.lga_id,
      purpose_id: buildingData.purpose_id,
      size: buildingData.size,
      taxpayer_id: buildingData.taxpayer_id,
      is_metered: buildingData.is_metered,
    });

    return {
      message: "Building created successfuly",
      data: createdBuilding,
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllBuildings = async () => {
  try {
    const buildings = await Building.findAll({
      include: [
        { model: State, attributes: ["state"] },
        { model: Lga, attributes: ["lga"] },
        { model: Town, attributes: ["town"] },
      ],
    });

    if (buildings.length === 0) {
      return {
        message: "No buildings found",
        data: [],
        statusCode: 200,
      };
    }

    const buildingCount = await Building.count();

    return {
      message: "Buildings retrieved successfully",
      data: buildings,
      statusCode: 200,
      count: buildingCount,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  createBuilding,
  getAllBuildings,
};
