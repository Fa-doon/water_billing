const { Taxpayer, State, Lga, Town } = require("../models");
const { CustomError } = require("../utils/customError");

const createTaxPayer = async (taxpayerDetails) => {
  try {
    const existingTaxpayer = await Taxpayer.findOne({
      where: { email: taxpayerDetails.email },
    });

    if (existingTaxpayer) {
      throw new CustomError("Taxpayer already exists", 409);
    }

    const state = await State.findByPk(taxpayerDetails.state_id);

    if (!state) {
      throw new CustomError("Invalid state ID", 400);
    }

    const lga = await Lga.findOne({
      where: { id: taxpayerDetails.lga_id, state_id: taxpayerDetails.state_id },
    });

    if (!lga) {
      throw new CustomError("Invalid Lga ID", 400);
    }

    const taxpayer = await Taxpayer.create(taxpayerDetails);

    const taxpayerResponse = await Taxpayer.findByPk(taxpayer.id, {
      include: [
        { model: State, attributes: ["state"] },
        { model: Lga, attributes: ["lga"] },
      ],
    });

    return {
      message: "Taxpayer created successfully",
      data: taxpayerResponse,
      statusCode: 201,
    };
  } catch (error) {
    console.log("Error creating taxpayer", error);
    throw error;
  }
};

const getAllTaxpayers = async () => {
  try {
    const taxpayers = await Taxpayer.findAll({
      include: [
        { model: State, attributes: ["state"] },
        { model: Lga, attributes: ["lga"] },
        { model: Town, attributes: ["town"] },
      ], 
    });

    if (taxpayers.length === 0) {
      return {
        message: "No taxpayers found",
        data: [],
        statusCode: 200,
      };
    }

    const taxpayerCount = await Taxpayer.count();

    return {
      message: "Taxpayers retrieved successfully",
      data: taxpayers,
      statusCode: 200,
      count: taxpayerCount,
    };
  } catch (error) {
    throw error;
  }
};

const getTaxpayerById = async (taxpayerId) => {
  try {
    const taxpayer = await Taxpayer.findByPk(taxpayerId, {
      include: [
        { model: State, attributes: ["state"] },
        { model: Lga, attributes: ["lga"] },
        { model: Town, attributes: ["town"] },
      ],
    });

    if (!taxpayer) {
      throw new CustomError(
        `Taxpayer with ID ${taxpayerId} does not exist`,
        404
      );
    }

    return {
      message: "Taxpayer retrieved successfully",
      data: taxpayer,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTaxpayer = async (taxpayerId, updateDetails) => {
  try {
    const taxpayer = await Taxpayer.findByPk(taxpayerId);
    if (!taxpayer) {
      throw new CustomError(`Taxpayer with ID ${taxpayerId} not found`, 404);
    }

    await taxpayer.update(updateDetails);
    return {
      message: "Taxpayer updated successfully",
      data: taxpayer,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

const deleteTaxpayer = async (taxpayerId) => {
  try {
    const taxpayer = await Taxpayer.findByPk(taxpayerId);
    if (!taxpayer) {
      throw new CustomError(`Taxpayer with ID ${taxpayerId} not found`, 404);
    }

    await taxpayer.destroy(taxpayerId);

    return {
      message: "Taxpayer deleted successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  createTaxPayer,
  getAllTaxpayers,
  getTaxpayerById,
  updateTaxpayer,
  deleteTaxpayer,
};
