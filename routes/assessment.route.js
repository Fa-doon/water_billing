const express = require("express");
const {
  createNewAssessment,
  getAllAssessmentItems,
} = require("../controllers/assessment.controller");
const router = express.Router();

router.post("/", createNewAssessment);
router.get("/", getAllAssessmentItems);

module.exports = router;
