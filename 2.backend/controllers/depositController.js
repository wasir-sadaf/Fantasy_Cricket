const db = require("../config/db");

const createDeposit = (req, res) => {
    const { wallet_id, amount, method, date } = req.body;

    if (!wallet_id || !amount || !method || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into Deposits (wallet_id, amount, method, date) values (?, ?, ?, ?)";
    db.query(sql, [wallet_id, amount, method, date], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "deposit created successfully", depositId: result.insertId });
    });
}

const getAllDeposits = (req, res) => {
    const sql = "select * from Deposits";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getDepositById = (req, res) => {
    const { id } = req.params;
    const sql = "select * from Deposits where deposit_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "deposit not found" });
        }
        res.status(200).json(result[0]);
    });
}

const updateDeposit = (req, res) => {
    const { id } = req.params;
    const { wallet_id, amount, method, date } = req.body;
    const sql = "update Deposits set wallet_id = ?, amount = ?, method = ?, date = ? where deposit_id = ?";
    db.query(sql, [wallet_id, amount, method, date, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "deposit updated successfully" });
    });
}

const deleteDeposit = (req, res) => {
    const { id } = req.params;
    const sql = "delete from Deposits where deposit_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "deposit deleted successfully" });
    });
}

module.exports = { createDeposit, getAllDeposits, getDepositById, updateDeposit, deleteDeposit };
