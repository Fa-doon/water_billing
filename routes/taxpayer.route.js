const express = require("express");
const {
  createTaxPayer,
  getAllTaxpayers,
  getTaxpayerById,
  updateTaxpayer,
  deleteTaxpayer,
} = require("../controllers/taxpayer.controller");

const router = express.Router();

router.post("/", createTaxPayer);
router.get("/", getAllTaxpayers);
router.get("/:id", getTaxpayerById);
router.put("/:id", updateTaxpayer);
router.delete("/:id", deleteTaxpayer);

module.exports = router;
