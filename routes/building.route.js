const express = require("express");
const {
  createBuilding,
  getAllBuildings,
  updateBuilding,
} = require("../controllers/building.controller");
const { validateBuilding } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/", validateBuilding, createBuilding);
router.get("/", getAllBuildings);
router.put("/:id", updateBuilding);

module.exports = router;
