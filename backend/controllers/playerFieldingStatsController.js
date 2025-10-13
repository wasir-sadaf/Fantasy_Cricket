const db = require("../config/db");

const createFieldingStats = (req, res) => {
    const { player_id, match_id, catches, run_outs, stumpings } = req.body;

    if (!player_id || !match_id || catches === undefined || run_outs === undefined || stumpings === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into PlayerFieldingStats (player_id, match_id, catches, run_outs, stumpings) values (?, ?, ?, ?, ?)";
    db.query(sql, [player_id, match_id, catches, run_outs, stumpings], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Fielding stats created successfully", statId: result.insertId });
    });
};

const getAllFieldingStats = (req, res) => {
    const sql = "select * from PlayerFieldingStats";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
};

const getFieldingStatsById = (req, res) => {
    const { id } = req.params;

    const sql = "select * from PlayerFieldingStats where field_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Fielding stats not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateFieldingStats = (req, res) => {
    const { id } = req.params;
    const { catches, run_outs, stumpings } = req.body;

    const sql = "update PlayerFieldingStats set catches = ?, run_outs = ?, stumpings = ? where field_stat_id = ?";
    db.query(sql, [catches, run_outs, stumpings, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Fielding stats updated successfully" });
    });
};

const deleteFieldingStats = (req, res) => {
    const { id } = req.params;

    const sql = "delete from PlayerFieldingStats where field_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Fielding stats deleted successfully" });
    });
};

module.exports = { createFieldingStats, getAllFieldingStats, getFieldingStatsById, updateFieldingStats, deleteFieldingStats };
