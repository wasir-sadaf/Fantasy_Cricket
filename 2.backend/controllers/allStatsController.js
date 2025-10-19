const db = require("../config/db.js");

// ------------------ PlayerStats ------------------
const getAllPlayerStats = (req, res) => {
    const sql = "SELECT * FROM PlayerStats";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getPlayerStatsById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM PlayerStats WHERE player_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Stats not found" });
        res.json(results[0]);
    });
};

// ------------------ PlayerBattingStats ------------------
const getAllPlayerBattingStats = (req, res) => {
    const sql = "SELECT * FROM PlayerBattingStats";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerBowlingStats ------------------
const getAllPlayerBowlingStats = (req, res) => {
    const sql = "SELECT * FROM PlayerBowlingStats";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerFieldingStats ------------------
const getAllPlayerFieldingStats = (req, res) => {
    const sql = "SELECT * FROM PlayerFieldingStats";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerSeasonStats ------------------
const getAllPlayerSeasonStats = (req, res) => {
    const sql = "SELECT * FROM PlayerSeasonStats";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerRankings ------------------
const getAllPlayerRankings = (req, res) => {
    const sql = "SELECT * FROM PlayerRankings";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerInjuries ------------------
const getAllPlayerInjuries = (req, res) => {
    const sql = "SELECT * FROM PlayerInjuries";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ PlayerAvailability ------------------
const getAllPlayerAvailability = (req, res) => {
    const sql = "SELECT * FROM PlayerAvailability";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

module.exports = {
    getAllPlayerStats,
    getPlayerStatsById,
    getAllPlayerBattingStats,
    getAllPlayerBowlingStats,
    getAllPlayerFieldingStats,
    getAllPlayerSeasonStats,
    getAllPlayerRankings,
    getAllPlayerInjuries,
    getAllPlayerAvailability
};
