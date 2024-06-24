const express = require("express");
const {
  createBuilding,
  getAllBuildings,
} = require("../controllers/building.controller");
const { validateBuilding } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/", validateBuilding, createBuilding);
router.get("/", getAllBuildings);

module.exports = router;
