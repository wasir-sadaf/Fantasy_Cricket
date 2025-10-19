// routes/allTransactionRoutes.js
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/allTransactionController");

// ------------------ Wallets ------------------
router.get("/wallets", transactionController.getAllWallets);
router.get("/wallets/:id", transactionController.getWalletById);
router.post("/wallets", transactionController.createWallet);

// ------------------ Transactions ------------------
router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/:id", transactionController.getTransactionById);
router.post("/transactions", transactionController.createTransaction);

// ------------------ Deposits ------------------
router.get("/deposits", transactionController.getAllDeposits);
router.post("/deposits", transactionController.createDeposit);

// ------------------ Withdrawals ------------------
router.get("/withdrawals", transactionController.getAllWithdrawals);
router.post("/withdrawals", transactionController.createWithdrawal);

module.exports = router;
