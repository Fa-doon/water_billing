const express = require("express");
const {
  createNewAssessment,
  getAllAssessmentItems,
  getAssessmentByBuildingId,
} = require("../controllers/assessment.controller");
const { validateAssessment } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/", validateAssessment, createNewAssessment);
router.get("/", getAllAssessmentItems);
router.get("/:buildingId", getAssessmentByBuildingId);

module.exports = router;
