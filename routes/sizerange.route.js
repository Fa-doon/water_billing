const express = require("express");
const { getAllSizeRanges } = require("../controllers/sizerange.controller");
const router = express.Router();

router.get("/", getAllSizeRanges);

module.exports = router;
