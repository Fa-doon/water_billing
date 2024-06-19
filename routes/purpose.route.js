const express = require("express");
const { getAllPurposes } = require("../controllers/purpose.controller");

const router = express.Router();

router.get("/", getAllPurposes);

module.exports = router;
