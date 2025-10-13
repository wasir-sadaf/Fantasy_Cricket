const db = require("../config/db");

const createWeek = (req, res) => {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into Weeks (start_date, end_date) values (?, ?)";
    db.query(sql, [start_date, end_date], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Week created successfully", weekId: result.insertId });
    });
};

const getAllWeeks = (req, res) => {
    const sql = "select * from Weeks";
    db.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(results);
    });
};

const getWeekById = (req, res) => {
    const { id } = req.params;
    const sql = "select * from Weeks where week_id = ?";
    db.query(sql, [id], (error, results) => {
        if (error) return res.status(500).json({ error: "database error" });
        if (results.length === 0) return res.status(404).json({ message: "Week not found" });
        res.status(200).json(results[0]);
    });
};

const updateWeek = (req, res) => {
    const { id } = req.params;
    const { start_date, end_date } = req.body;

    const sql = "update Weeks set start_date = ?, end_date = ? where week_id = ?";
    db.query(sql, [start_date, end_date, id], (error, result) => {
        if (error) return res.status(500).json({ error: "database error" });
        res.status(200).json({ message: "Week updated successfully" });
    });
};

const deleteWeek = (req, res) => {
    const { id } = req.params;
    const sql = "delete from Weeks where week_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json({ error: "database error" });
        res.status(200).json({ message: "Week deleted successfully" });
    });
};

module.exports = { createWeek, getAllWeeks, getWeekById, updateWeek, deleteWeek };
