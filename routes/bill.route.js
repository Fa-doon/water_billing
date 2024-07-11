const express = require("express");
const { generateBill } = require("../controllers/bill.controller");
const router = express.Router();

router.post("/generate", generateBill);

module.exports = router;
