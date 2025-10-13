const db = require("../config/db");

const createBowlingStats = (req,res) =>{
    const { player_id, match_id, overs, runs_given, wickets, economy } = req.body;

    if (!player_id || !match_id || overs == null || runs_given == null) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    const sql = "insert into PlayerBowlingStats (player_id, match_id, overs, runs_given, wickets, economy) values (?, ?, ?, ?, ?, ?)";
    db.query(sql, [player_id, match_id, overs, runs_given, wickets, economy], (error, result) => {
        if (error) return res.status(500).json({ error: "database error" });
        res.status(201).json({ message: "Bowling stats created", bowlStatId: result.insertId });
    });
}

const getAllBowlingStats = (req,res) =>{
    const sql = "select * from PlayerBowlingStats";

    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getBowlingStatsById =(req,res) =>{
    const { id } = req.params;

    const sql = "select * from PlayerBowlingStats where bowl_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Bowling stats not found" });
        }
        res.status(200).json(result[0]);
    });
}

const updateBowlingStats = (req, res) => {
    const { id } = req.params;
    const { overs, runs_given, wickets, economy } = req.body;

    const sql = "update PlayerBowlingStats set overs = ?, runs_given = ?, wickets = ?, economy = ? where bowl_stat_id = ?";
    db.query(sql, [overs, runs_given, wickets, economy, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Bowling stats updated successfully" });
    });
};

const deleteBowlingStats = (req, res) => {
    const { id } = req.params;

    const sql = "delete from PlayerBowlingStats where bowl_stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Bowling stats deleted successfully" });
    });
};

module.exports = {createBowlingStats, getAllBowlingStats, getBowlingStatsById, updateBowlingStats, deleteBowlingStats};