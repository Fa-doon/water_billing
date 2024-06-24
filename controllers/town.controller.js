const townServices = require("../services/town.services");
const { errorHandler } = require("../middlewares/error.middleware");

const getTownByLgaId = async (req, res, next) => {
  try {
    const lgaId = req.params.lgaId;
    const towns = await townServices.getTownByLgaId(lgaId);

    return res.status(towns.statusCode).json({
      message: towns.message,
      townDetails: towns.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = { getTownByLgaId };
