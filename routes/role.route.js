const express = require("express");
const {
  createRole,
  getRoleById,
  getRoleByRoleName,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(isAdmin);

router.post("/", createRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.get("/get-role/:roleName", getRoleByRoleName);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
