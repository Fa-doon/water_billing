const express = require("express");
const { getTownByLgaId } = require("../controllers/town.controller");

const router = express.Router();

router.get("/:lgaId", getTownByLgaId);

module.exports = router;
