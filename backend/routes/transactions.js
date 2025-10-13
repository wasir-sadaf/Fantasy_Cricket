const express = require("express");
const router = express.Router();
const { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } = require("../controllers/transactionController");

router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
