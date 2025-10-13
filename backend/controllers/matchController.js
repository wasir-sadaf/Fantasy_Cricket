const db = require("../config/db");

const createMatch = (req,res) =>{
    const { home_team_id, away_team_id, match_date, venue_id, league_id } = req.body;

    if (!home_team_id || !away_team_id || !match_date || !venue_id || !league_id) {
        return res.status(400).json({ message: "all fields are required" });
    }

    const sql = "insert into Matches (home_team_id, away_team_id, match_date, venue_id, league_id) values (?, ?, ?, ?, ?)";
    db.query(sql, [home_team_id, away_team_id, match_date, venue_id, league_id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "match created successfully", match_id: result.insertId });
    });
}

const getAllMatches = (req,res) =>{
    const sql = "select * from Matches";

    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getMatchById = (req,res) =>{
    const { id } = req.params;

    const sql = "select * from Matches where match_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "match not found" });
        }

        res.status(200).json(result[0]);
    });
}

const updateMatches = (req,res) =>{
    const { id } = req.params;
    const { home_team_id, away_team_id, match_date, venue_id, league_id } = req.body;

    const sql = "update Matches set home_team_id = ?, away_team_id = ?, match_date = ?, venue_id = ?, league_id = ? where match_id = ?";
    db.query(sql, [home_team_id, away_team_id, match_date, venue_id, league_id, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        res.status(200).json({ message: "match updated successfully" });
    });
}

const deleteMatch = (req,res) =>{
    const { id } = req.params;

    const sql = "delete from Matches where match_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        res.status(200).json({ message: "match deleted successfully" });
    });
}

module.exports = {createMatch, getAllMatches, getMatchById, updateMatches, deleteMatch};