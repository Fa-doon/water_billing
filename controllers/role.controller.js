const roleService = require("../services/role.services");
const { errorHandler } = require("../middlewares/error.middleware");

const createRole = async (req, res, next) => {
  try {
    const role = req.body;

    const createdRole = await roleService.createRole(role);
    return res.status(createdRole.statusCode).json({
      message: createdRole.message,
      role: createdRole.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(roles.statusCode).json({
      message: roles.message,
      roles: roles.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const role = await roleService.getRoleById(id);
    return res.status(role.statusCode).json({
      message: role.message,
      role: role.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getRoleByRoleName = async (req, res, next) => {
  try {
    const { roleName } = req.params
    const role = await roleService.getRoleByRoleName(roleName);
    return res.status(role.statusCode).json({
      message: role.message,
      role: role.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const body = req.body;

    const role = await roleService.updateRole(id, body);
    return res.status(role.statusCode).json({
      message: role.message,
      updatedRole: role.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const role = await roleService.deleteRole(id);
    return res.status(role.statusCode).json({
      message: role.message,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  getRoleByRoleName,
  updateRole,
  deleteRole,
};
