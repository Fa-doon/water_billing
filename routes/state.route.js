const express = require("express");
const {
  getAllStates,
  getStateById,
} = require("../controllers/state.controller");

const router = express.Router();

router.get("/", getAllStates);
router.get("/:id", getStateById);

module.exports = router;
