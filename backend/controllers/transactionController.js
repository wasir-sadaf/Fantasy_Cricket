const db = require("../config/db");

const createTransaction = (req, res) => {
    const { user_id, amount, type, date, status } = req.body;

    if (!user_id || !amount || !type || !date || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into Transactions (user_id, amount, type, date, status) values (?, ?, ?, ?, ?)";
    db.query(sql, [user_id, amount, type, date, status], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "transaction created successfully", transactionId: result.insertId });
    });
};

const getAllTransactions = (req, res) => {
    const sql = "select * from Transactions";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
};

const getTransactionById = (req, res) => {
    const { id } = req.params;

    const sql = "select * from Transactions where transaction_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "transaction not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateTransaction = (req, res) => {
    const { id } = req.params;
    const { user_id, amount, type, date, status } = req.body;

    const sql = "update Transactions set user_id = ?, amount = ?, type = ?, date = ?, status = ? where transaction_id = ?";
    db.query(sql, [user_id, amount, type, date, status, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "transaction updated successfully" });
    });
};

const deleteTransaction = (req, res) => {
    const { id } = req.params;

    const sql = "delete from Transactions where transaction_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "transaction deleted successfully" });
    });
};

module.exports = { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction };
