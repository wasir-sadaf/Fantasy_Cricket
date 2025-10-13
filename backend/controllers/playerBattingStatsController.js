const db = require("../config/db");

const createBattingStats = (req, res) => {
    const { player_id, match_id, runs, balls, fours, sixes, strike_rate } = req.body;

    if (!player_id || !match_id || runs === undefined || balls === undefined || fours === undefined || sixes === undefined || strike_rate === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into PlayerBattingStats (player_id, match_id, runs, balls, fours, sixes, strike_rate) values (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [player_id, match_id, runs, balls, fours, sixes, strike_rate], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Batting stats created successfully", statId: result.insertId });
    });
};

const getAllBattingStats = (req, res) => {
    const sql = "select * from PlayerBattingStats";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
};

const getBattingStatsById = (req, res) => {
    const { id } = req.params;

    const sql = "select * from PlayerBattingStats where bat_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Batting stats not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateBattingStats = (req, res) => {
    const { id } = req.params;
    const { runs, balls, fours, sixes, strike_rate } = req.body;

    const sql = "update PlayerBattingStats set runs = ?, balls = ?, fours = ?, sixes = ?, strike_rate = ? where bat_stat_id = ?";
    db.query(sql, [runs, balls, fours, sixes, strike_rate, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Batting stats updated successfully" });
    });
};

const deleteBattingStats = (req, res) => {
    const { id } = req.params;

    const sql = "delete from PlayerBattingStats where bat_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Batting stats deleted successfully" });
    });
};

module.exports = { createBattingStats, getAllBattingStats, getBattingStatsById, updateBattingStats, deleteBattingStats };
