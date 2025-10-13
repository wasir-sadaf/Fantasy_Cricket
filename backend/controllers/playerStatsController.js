const db = require("../config/db");
const calculatePlayerPoints = require("../utils/calculatePoints");

const createPlayerStats = (req,res) =>{
    const { player_id, match_id, runs, wickets, catches } = req.body;

    if (!player_id || !match_id) {
        return res.status(400).json({ message: "player id and match id are required" });
    }

    const points = calculatePlayerPoints({runs, wickets, catches});
    
    const sql = "insert into PlayerStats (player_id, match_id, runs, wickets, catches, points) values (?, ?, ?, ?, ?, ?)";
    db.query(sql, [player_id, match_id, runs, wickets, catches, points], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Player stats created", statId: result.insertId, points });
    });
}

const getAllPlayerStats =(req,res) =>{
    const sql = "select * from PlayerStats";

    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getPlayerStatsById =(req,res) =>{
    const { id } = req.params;

    const sql = "select * from PlayerStats where stat_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Player stats not found" });
        }
        res.status(200).json(result[0]);
    });
}

const updatePlayerStats =(req,res) =>{
    const { id } = req.params;
    const { runs, wickets, catches } = req.body;

    const points = calculatePlayerPoints({ runs, wickets, catches });

    const sql = "update PlayerStats set runs=?, wickets=?, catches=?, points=? where stat_id=?";
    db.query(sql, [runs, wickets, catches, points, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Player stats updated", points });
    });
}

const deletePlayerStats =(req,res) =>{
    const { id } = req.params;

    const sql = "delete from PlayerStats where stat_id=?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Player stats deleted" });
    });
}

module.exports = {createPlayerStats, getAllPlayerStats, getPlayerStatsById, updatePlayerStats, deletePlayerStats};