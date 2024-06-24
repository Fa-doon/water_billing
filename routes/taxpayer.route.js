const express = require("express");
const {
  createTaxPayer,
  getAllTaxpayers,
  getTaxpayerById,
  updateTaxpayer,
  deleteTaxpayer,
} = require("../controllers/taxpayer.controller");
const { validateTaxpayer } = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/", validateTaxpayer, createTaxPayer);
router.get("/", getAllTaxpayers);
router.get("/:id", getTaxpayerById);
router.put("/:id", updateTaxpayer);
router.delete("/:id", deleteTaxpayer);

module.exports = router;
