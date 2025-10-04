const db = require("../config/db");

const addPlayerToTeam = (req,res) =>{
    const { fantasy_team_id, player_id, is_captain, is_vice_captain } = req.body;

    if(!fantasy_team_id || !player_id){
        return res.status(400).json({ message: "fantasy_team_id and player_id are required" });
    }

    const sql = "insert into FantasyTeamPlayers (fantasy_team_id, player_id, is_captain, is_vice_captain) values (?, ?, ?, ?)";
    db.query(sql, [fantasy_team_id, player_id, is_captain || 0, is_vice_captain || 0], (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "player added to fantasy team", ftp_id: result.insertId });
    });
}

const getTeamPlayer = (req,res) =>{
    const { fantasy_team_id } = req.params;

    const sql = "select * from FantasyTeamPlayers where fantasy_team_id = ?";

    db.query(sql, [fantasy_team_id], (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const removePlayerFromTeam = (req,res) =>{
    const { id } = req.params;

    const sql = "delete from FantasyTeamPlayers where ftp_id = ?";
    db.query(sql, [id], (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "player removed from fantasy team" });
    });
}

module.exports = {addPlayerToTeam, getTeamPlayer, removePlayerFromTeam};