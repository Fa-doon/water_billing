const {
  Building,
  Taxpayer,
  Function,
  Purpose,
  State,
  Lga,
  Town,
  Assessment_Item,
  Billing
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

    return {
      message: "Buildings retrieved successfully",
      data: buildings,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

const updateBuilding = async (buildingId, updateDetails) => {
  try {
    const building = await Building.findByPk(buildingId);
    if (!building) {
      throw new CustomError(`Building with the ID ${buildingId} not found`);
    }

    await building.update(updateDetails);
    return {
      message: "Building has been updated successfully",
      data: building,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

const deleteBuilding = async (buildingId) => {
  const t = await Building.sequelize.transaction();
  try {
    const building = await Building.findByPk(buildingId, { transaction: t });
    if (!building) {
      throw new CustomError(`Building with the ID ${buildingId} not found`, 404);
    }

    await Billing.destroy({ where: { building_id: buildingId }, transaction: t });
    await Assessment_Item.destroy({ where: { building_id: buildingId }, transaction: t });
    await building.destroy({ transaction: t });

    await t.commit();

    return {
      message: "Building deleted successfully",
      statusCode: 200,
    }
  } catch (error) {
    await t.rollback();
    console.error("Error deleting building and related records", error);
    throw error;
  }
};


const getBuildingByLgaId = async (lgaId) => {
  try {
    const buildings = await Building.findAll({
      where: { lga_id: lgaId },
      attributes: ["id", "name"],
    });

    if (buildings.length === 0) {
      throw new CustomError(`No Buildings for LGA found with ID ${lgaId}`, 404);
    }

    return {
      message: "Buildings retrieved successfully",
      data: buildings,
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error fetching buildings", error);
    throw error;
  }
};

module.exports = {
  createBuilding,
  getAllBuildings,
  updateBuilding,
  deleteBuilding,
  getBuildingByLgaId,
};
