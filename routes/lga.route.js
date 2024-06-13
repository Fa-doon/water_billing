const express = require("express");
const { getAllLgas } = require("../controllers/lga.controller");
const router = express.Router();

router.get("/", getAllLgas);

module.exports = router;
