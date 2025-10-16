const db = require("../config/db");

const createFantasyTeam = (req,res) =>{
    const { user_id, league_id, team_name } = req.body;

    if (!user_id || !league_id || !team_name) {
        return res.status(400).json({ message: "all fields are required" });
    }

    const sql = "insert into FantasyTeams (user_id, league_id, team_name, created_at) values (?, ?, ?, now())";
    db.query(sql, [user_id, league_id, team_name], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "fantasy team created successfully", teamId: result.insertId });
    });
}

const getAllFantasyTeam = (req,res) =>{
    const sql = "select * from FantasyTeams";
    
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getFantasyTeamById = (req,res) =>{
    const { id } = req.params;

    const sql = "select * from FantasyTeams where fantasy_team_id = ?";
    
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "fantasy team not found" });
        }
        res.status(200).json(result[0]);
    });
}


const updateFantasyTeam = (req,res) =>{
    const { id } = req.params;
    const { team_name, league_id } = req.body;

    const sql = "update FantasyTeams set team_name = ?, league_id = ? where fantasy_team_id = ?";
    db.query(sql, [team_name, league_id, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "fantasy team updated successfully" });
    });
}

const deleteFantasyTeam = (req,res) =>{
    const { id } = req.params;

    const sql = "delete from FantasyTeams where fantasy_team_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "fantasy team deleted successfully" });
    });
}

module.exports = {createFantasyTeam, getAllFantasyTeam, getFantasyTeamById, updateFantasyTeam, deleteFantasyTeam};