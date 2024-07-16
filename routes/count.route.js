const express = require("express");
const { getCounts } = require("../controllers/count.controller");
const router = express.Router();

router.get("/", getCounts);

module.exports = router;
