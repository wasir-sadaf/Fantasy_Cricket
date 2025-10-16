const db = require("../config/db");

const joinPrivateLeague = (req, res) => {
    const { private_league_id, user_id } = req.body;

    if(!private_league_id || !user_id){
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkSql = "select * from FantasyPrivateLeagueMembers where private_league_id = ? and user_id = ?";
    db.query(checkSql, [private_league_id, user_id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({ error: "database error" });
        }

        if(result.length > 0){
            return res.status(400).json({ message: "User already joined this league" });
        }

        // Insert into members table
        const sql = "insert into FantasyPrivateLeagueMembers (private_league_id, user_id, joined_at) values (?, ?, NOW())";
        db.query(sql, [private_league_id, user_id], (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({ error: "database error" });
            }
            res.status(201).json({ message: "User joined league successfully", memberId: result.insertId });
        });
    });
};

const getLeagueMembers = (req, res) => {
    const { private_league_id } = req.params;

    const sql = "select * from FantasyPrivateLeagueMembers where private_league_id = ?";
    db.query(sql, [private_league_id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
};

module.exports = { joinPrivateLeague, getLeagueMembers };
