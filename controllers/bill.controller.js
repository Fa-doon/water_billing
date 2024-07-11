const { errorHandler } = require("../middlewares/error.middleware");
const billService = require("../services/billing.services");

const generateBill = async (req, res, next) => {
  try {
    const bill = req.body;

    const newBill = await billService.generateBill(bill);
    return res.status(newBill.statusCode).json({
      message: newBill.message,
      newBillDetails: newBill.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  generateBill,
};
