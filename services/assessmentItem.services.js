const {
  Assessment_Item,
  Building,
  Function,
  Purpose,
  Size_range,
} = require("../models");
const { CustomError } = require("../utils/customError");
const { Op } = require("sequelize");

const newAssessment = async (assessmentDetails) => {
  try {
    const { building_id, meter_reading, meter_id } = assessmentDetails;

    const building = await Building.findByPk(building_id, {
      include: [Purpose, Function],
    });

    console.log(building);
    if (!building) {
      throw new CustomError(`Building does not exist`, 404);
    }

    // check that the size range tallies
    const sizerange = await Size_range.findOne({
      where: {
        min_size: {
          [Op.lte]: building.size,
        },
        max_size: {
          [Op.gte]: building.size,
        },
      },
    });

    if (!sizerange) {
      throw new CustomError(
        `Size range not found with building ID ${building_id}`
      );
    }

    let rate;
    if (building.is_metered) {
      rate = 110 * meter_reading;
    } else {
      const purposeRate = building.Purpose.rate;
      const functionRate = building.Function.rate;
      rate = sizerange.rate * purposeRate * functionRate;
    }

    const assessmentItem = await Assessment_Item.create({
      building_id,
      sizerange_id: sizerange.id,
      meter_reading,
      meter_id,
      rate,
    });

    return {
      message: "Assessment Item created successfully",
      data: {
        assessmentItem,
        buildingName: building.name,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

const getAllAssessmentItems = async () => {
  try {
    const assessments = await Assessment_Item.findAll({
      include: {
        model: Building,
        attributes: ["name"],
      },
    });

    if (assessments.length === 0) {
      return {
        message: "No assessment found",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Assessments retrieved successfully",
      data: assessments,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

const getAssessmentByBuildingId = async (buildingId) => {
  try {
    const building = await Building.findByPk(buildingId);

    if (!building) {
      throw new CustomError(
        `Building with the ID ${buildingId} does not exist`,
        404
      );
    }

    const assessments = await Assessment_Item.findAll({
      where: { building_id: buildingId },
    });

    if (assessments.length === 0) {
      return {
        message: "No assessments found for this building",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Assessments retrieved successfully",
      data: assessments,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  newAssessment,
  getAllAssessmentItems,
  getAssessmentByBuildingId,
};
