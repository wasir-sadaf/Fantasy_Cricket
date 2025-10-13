const express = require("express");
const router = express.Router();
const { createWallet, getAllWallets, getWalletById, updateWallet, deleteWallet } = require("../controllers/walletController");

// Wallet endpoints
router.post("/", createWallet);
router.get("/", getAllWallets);
router.get("/:id", getWalletById);
router.put("/:id", updateWallet);
router.delete("/:id", deleteWallet);

module.exports = router;
