const express = require("express");
const {
  createNewAssessment,
  getAllAssessmentItems,
  getAssessmentByBuildingId,
} = require("../controllers/assessment.controller");
const router = express.Router();

router.post("/", createNewAssessment);
router.get("/", getAllAssessmentItems);
router.get("/:buildingId", getAssessmentByBuildingId);

module.exports = router;
