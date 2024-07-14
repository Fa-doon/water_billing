const express = require("express");
const {
  generateBill,
  getAllBillings,
} = require("../controllers/bill.controller");
const { validateBilling } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/generate", validateBilling, generateBill);
router.get("/", getAllBillings);

module.exports = router;
