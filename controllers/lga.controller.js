const lgaService = require("../services/lga.services");
const { errorHandler } = require("../middlewares/error.middleware");


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
  getLgaByStateId,
};
