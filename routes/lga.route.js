const express = require("express");
const {
  getAllLgas,
  getLgaById,
  getLgaByStateId,
} = require("../controllers/lga.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

// router.use(isAdmin);

router.get("/lga/:stateId", getLgaByStateId);

module.exports = router;
