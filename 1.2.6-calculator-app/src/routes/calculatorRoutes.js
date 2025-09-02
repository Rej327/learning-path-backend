const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers/calculatorController");

router.post("/add", calculatorController.add);
router.post("/subtract", calculatorController.subtract);
router.post("/multiply", calculatorController.multiply);
router.post("/divide", calculatorController.divide);
router.get("/value", calculatorController.getValue);
router.post("/reset", calculatorController.reset);

module.exports = router;
