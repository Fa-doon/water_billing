const express = require("express");
const {
  createBuilding,
  getAllBuildings,
  updateBuilding,
  getBuildingByLgaId,
} = require("../controllers/building.controller");
const { validateBuilding } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/", validateBuilding, createBuilding);
router.get("/", getAllBuildings);
router.get("/:lgaId", getBuildingByLgaId);
router.put("/:id", updateBuilding);

module.exports = router;
