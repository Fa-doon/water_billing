const { errorHandler } = require("../middlewares/error.middleware");
const taxpayerService = require("../services/taxpayer.services");

const createTaxPayer = async (req, res, next) => {
  try {
    const taxpayer = req.body;

    const newTaxpayer = await taxpayerService.createTaxPayer(taxpayer);

    return res.status(newTaxpayer.statusCode).json({
      message: newTaxpayer.message,
      taxpayerData: newTaxpayer.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getAllTaxpayers = async (req, res, next) => {
  try {
    const taxpayers = await taxpayerService.getAllTaxpayers();
    return res.status(taxpayers.statusCode).json({
      message: taxpayers.message,
      taxpayersData: taxpayers.data,
      count: taxpayers.count,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getTaxpayerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const taxpayer = await taxpayerService.getTaxpayerById(id);

    return res.status(taxpayer.statusCode).json({
      message: taxpayer.message,
      taxpayerData: taxpayer.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const updateTaxpayer = async (req, res, next) => {
  try {
    const id = req.params.id;

    const body = req.body;

    const taxpayer = await taxpayerService.updateTaxpayer(id, body);

    return res.status(taxpayer.statusCode).json({
      message: taxpayer.message,
      taxpayerData: taxpayer.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const deleteTaxpayer = async (req, res, next) => {
  try {
    const id = req.params.id;

    const taxpayer = await taxpayerService.deleteTaxpayer(id);
    return res.status(taxpayer.statusCode).json({ message: taxpayer.message });
  } catch (error) {
    console.log(error);
    errorHandler(error, res, next);
  }
};

module.exports = {
  createTaxPayer,
  getAllTaxpayers,
  getTaxpayerById,
  updateTaxpayer,
  deleteTaxpayer,
};
