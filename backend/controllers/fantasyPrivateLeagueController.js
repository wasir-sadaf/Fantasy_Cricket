const db = require("../config/db");

const createPrivateLeague = (req, res) => {
    const { name, created_by, invite_code, max_users } = req.body;

    if (!name || !created_by || !invite_code || !max_users) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into FantasyPrivateLeagues (name, created_by, invite_code, max_users) values (?, ?, ?, ?)";
    db.query(sql, [name, created_by, invite_code, max_users], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Private league created", leagueId: result.insertId });
    });
};

const getAllPrivateLeagues = (req, res) => {
    const sql = "select * from FantasyPrivateLeagues";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
};

const getPrivateLeagueById = (req, res) => {
    const { id } = req.params;

    const sql = "select * from FantasyPrivateLeagues where private_league_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Private league not found" });
        }
        res.status(200).json(result[0]);
    });
};

module.exports = { createPrivateLeague, getAllPrivateLeagues, getPrivateLeagueById };
