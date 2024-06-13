const { Admin, Role } = require("../models");
const { CustomError } = require("../utils/customError");
const jwt = require("jsonwebtoken");

const loginAdmin = async (adminDetails) => {
  try {
    const admin = await Admin.findOne({
      where: { email: adminDetails.email },
      include: {
        model: Role,
        attributes: ["name"],
      },
    });

    if (!admin) {
      throw new CustomError("Email or password incorrect", 401);
    }

    if (admin.password !== adminDetails.password) {
      throw new CustomError("Email or password incorrect", 401);
    }

    const role = admin.Role.name;

    const token = await jwt.sign(
      {
        email: admin.email,
        createdAt: admin.createdAt,
        id: admin.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      message: "Login successful",
      token: token,
      data: {
        id: admin.id,
        fullname: admin.fullname,
        username: admin.username,
        email: admin.email,
        role: {
          name: role
        }
      },
      statusCode: 201,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { loginAdmin };
