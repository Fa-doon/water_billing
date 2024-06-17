const lgaService = require("../services/lga.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getAllLgas = async (req, res, next) => {
  try {
    const lgas = await lgaService.getAllLgas();
    
    return res.status(lgas.statusCode).json({
      message: lgas.message,
      lgas: lgas.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getLgaById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const lga = await lgaService.getLgaById(id);

    return res.status(lga.statusCode).json({
      message: lga.message,
      lga: lga.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getLgaByStateId = async (req, res, next) => {
  try {
    const stateId = req.params.stateId;

    const lgas = await lgaService.getLgaByStateId(stateId);

    res.status(lgas.statusCode).json({
      message: lgas.message,
      lgas: lgas.data,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, res, next);
  }
};

module.exports = {
  getAllLgas,
  getLgaById,
  getLgaByStateId,
};
