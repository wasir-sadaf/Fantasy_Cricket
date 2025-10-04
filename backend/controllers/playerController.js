const db = require("../config/db");

const createPlayer = (req,res) =>{
    const { name, role, real_team_id, nationality, price } = req.body;

    if (!name || !role || !real_team_id || !nationality || !price) {
        return res.status(400).json({ message: "all fields are required" });
    }

    const sql = "insert into Players (name, role, real_team_id, nationality, price) values (?, ?, ?, ?, ?)";
    db.query(sql, [name, role, real_team_id, nationality, price], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "player created successfully", playerid: result.insertId });
    });
}

const getAllPlayer = (req,res) =>{
    const sql = "select * from Players";
    db.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(results);
    });
}

const getPlayerById = (req,res) =>{
    const { id } = req.params;
    const sql = "select * from Players where player_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "player not found" });
        }
        res.status(200).json(result[0]);
    });
}

const updatePlayer = (req,res) =>{
    const { id } = req.params;
    const { name, role, real_team_id, nationality, price } = req.body;

    const sql = "update Players set name = ?, role = ?, real_team_id = ?, nationality = ?, price = ? where player_id = ?";
    db.query(sql, [name, role, real_team_id, nationality, price, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "player updated successfully" });
    });
}

const deletePlayer = (req,res)=>{
    const { id } = req.params;
    const sql = "delete from Players where player_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "player deleted successfully" });
    });
}

module.exports = {createPlayer, getAllPlayer, getPlayerById, updatePlayer, deletePlayer};