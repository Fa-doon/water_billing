const { Role } = require("../models");
const { CustomError } = require("../utils/customError");
const { Sequelize  } = require("sequelize");

// const createRole = async (roleData) => {
//   try {
//     const existingRole = await Role.findOne({ where: { name: roleData.name } });

//     if (existingRole) {
//       throw new CustomError("Role already exists", 409);
//     }

//     const createdRole = await Role.create(roleData);
//     return {
//       message: "Role created successfully",
//       data: createdRole,
//       statusCode: 201,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

const getAllRoles = async () => {
  try {
    const roles = await Role.findAll();

    if (roles.length === 0) {
      return {
        message: "No roles found in the database",
        data: [],
        statusCode: 200,
      };
    }

    return {
      message: "Roles retrieved successfully",
      data: roles,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getRoleById = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new CustomError(`Role with role ID ${roleId} does not exist`, 200);
    }

    return {
      message: "Role retrieved successfully",
      data: role,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

const getRoleByRoleName = async (roleName) => {
  try {
    // ignores casing or seperation between words
    const input = roleName.replace(/\s+/g, "").toLowerCase();
    const role = await Role.findOne({
      where: Sequelize.where(
        Sequelize.fn(
          "replace",
          Sequelize.fn("lower", Sequelize.col("name")),
          " ",
          ""
        ),
        input
      ),
    });
    if (!role) {
      throw new CustomError(`Role ${roleName} not found`, 404);
    }

    return {
      message: "Role retrieved successfully",
      data: role,
      statusCode: 200,
    };
  } catch (error) {
    console.log("Error getting role name", error);
    throw error;
  }
};

const updateRole = async (roleId, updateDetails) => {
  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new CustomError(`Role with ID ${roleId} not found`, 404);
    }

    await role.update(updateDetails);
    return {
      message: "Role updated successfully",
      data: role,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

// const deleteRole = async (roleId) => {
//   try {
//     const role = await Role.findByPk(roleId);
//     if (!role) {
//       throw new CustomError(`Role with ID ${roleId} not found`, 404);
//     }

//     await role.destroy(roleId);

//     return {
//       message: "Role deleted successfully",
//       statusCode: 200,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  // createRole,
  getAllRoles,
  getRoleById,
  getRoleByRoleName,
  updateRole,
  // deleteRole,
};
