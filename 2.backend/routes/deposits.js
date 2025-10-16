const express = require("express");
const router = express.Router();
const { createDeposit, getAllDeposits, getDepositById, updateDeposit, deleteDeposit } = require("../controllers/depositController");

router.post("/", createDeposit);
router.get("/", getAllDeposits);
router.get("/:id", getDepositById);
router.put("/:id", updateDeposit);
router.delete("/:id", deleteDeposit);

module.exports = router;
