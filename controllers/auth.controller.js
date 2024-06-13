const { errorHandler } = require("../middlewares/error.middleware");
const authService = require("../services/auth.services");

const loginAdmin = async (req, res, next) => {
  try {
    const body = req.body;

    const user = await authService.loginAdmin(body);
    return res.status(user.statusCode).json({
      message: user.message,
      token: user.token,
      data: user.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  loginAdmin,
};
