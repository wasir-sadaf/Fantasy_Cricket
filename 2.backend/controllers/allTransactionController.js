// controllers/allTransactionController.js
const db = require("../config/db.js");

// ------------------ Wallets ------------------
const getAllWallets = (req, res) => {
    const sql = "SELECT * FROM Wallets";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getWalletById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Wallets WHERE wallet_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Wallet not found" });
        res.json(results[0]);
    });
};

const createWallet = (req, res) => {
    const { user_id, balance } = req.body;
    const sql = "INSERT INTO Wallets (user_id, balance) VALUES (?, ?)";
    db.query(sql, [user_id, balance], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Wallet created", wallet_id: result.insertId });
    });
};

// ------------------ Transactions ------------------
const getAllTransactions = (req, res) => {
    const sql = "SELECT * FROM Transactions";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getTransactionById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Transactions WHERE transaction_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Transaction not found" });
        res.json(results[0]);
    });
};

const createTransaction = (req, res) => {
    const { wallet_id, type, amount, description } = req.body;
    const sql = "INSERT INTO Transactions (wallet_id, type, amount, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [wallet_id, type, amount, description], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Transaction created", transaction_id: result.insertId });
    });
};

// ------------------ Deposits ------------------
const getAllDeposits = (req, res) => {
    const sql = "SELECT * FROM Deposits";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createDeposit = (req, res) => {
    const { wallet_id, amount, method } = req.body;
    const sql = "INSERT INTO Deposits (wallet_id, amount, method) VALUES (?, ?, ?)";
    db.query(sql, [wallet_id, amount, method], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Deposit created", deposit_id: result.insertId });
    });
};

// ------------------ Withdrawals ------------------
const getAllWithdrawals = (req, res) => {
    const sql = "SELECT * FROM Withdrawals";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createWithdrawal = (req, res) => {
    const { wallet_id, amount, method } = req.body;
    const sql = "INSERT INTO Withdrawals (wallet_id, amount, method) VALUES (?, ?, ?)";
    db.query(sql, [wallet_id, amount, method], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Withdrawal created", withdrawal_id: result.insertId });
    });
};

module.exports = {
    getAllWallets,
    getWalletById,
    createWallet,
    getAllTransactions,
    getTransactionById,
    createTransaction,
    getAllDeposits,
    createDeposit,
    getAllWithdrawals,
    createWithdrawal
};
