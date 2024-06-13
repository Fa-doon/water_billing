const { errorHandler } = require("../middlewares/error.middleware");
const authService = require("../services/auth.services");

const loginAdmin = async (req, res, next) => {
  try {
    const body = req.body;

    const userDetails = await authService.loginAdmin(body);
    return res.status(userDetails.statusCode).json({
      message: userDetails.message,
      token: userDetails.token,
      data: userDetails.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  loginAdmin,
};
