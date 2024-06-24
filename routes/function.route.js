const express = require("express");
const { getAllFunctions } = require("../controllers/function.controller");

const router = express();

router.get("/", getAllFunctions);

module.exports = router;
