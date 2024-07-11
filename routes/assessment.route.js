const express = require("express");
const { createNewAssessment } = require("../controllers/assessment.controller");
const router = express.Router();

router.post("/", createNewAssessment);

module.exports = router;
