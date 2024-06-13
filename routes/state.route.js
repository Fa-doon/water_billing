const express = require("express");
const { getAllStates } = require("../controllers/state.controller");

const router = express.Router();

router.get("/", getAllStates);

module.exports = router;