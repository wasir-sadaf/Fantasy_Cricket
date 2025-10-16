const db = require("../config/db");

const createWallet = (req, res) => {
    const { user_id, balance } = req.body;

    if (!user_id || balance == null) {
        return res.status(400).json({ message: "user_id and balance are required" });
    }

    const sql = "insert into Wallets (user_id, balance, last_updated) values (?, ?, now())";
    db.query(sql, [user_id, balance], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "wallet created successfully", walletId: result.insertId });
    });
}

const getAllWallets = (req, res) => {
    const sql = "select * from Wallets";
    db.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(results);
    });
}

const getWalletById = (req, res) => {
    const { id } = req.params;
    const sql = "select * from Wallets where wallet_id = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "wallet not found" });
        }
        res.status(200).json(results[0]);
    });
}

const updateWallet = (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;

    if (balance == null) {
        return res.status(400).json({ message: "balance is required" });
    }

    const sql = "update Wallets set balance = ?, last_updated = now() where wallet_id = ?";
    db.query(sql, [balance, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "wallet updated successfully" });
    });
}

const deleteWallet = (req, res) => {
    const { id } = req.params;
    const sql = "delete from Wallets where wallet_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "wallet deleted successfully" });
    });
}

module.exports = { createWallet, getAllWallets, getWalletById, updateWallet, deleteWallet };
