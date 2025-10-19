const db = require("../config/db.js");

// ------------------ RealTeams ------------------
const getAllRealTeams = (req, res) => {
    const sql = "SELECT * FROM RealTeams";
    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getRealTeamById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM RealTeams WHERE team_id=?";
    db.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        if(results.length === 0) return res.status(404).json({ message: "Team not found" });
        res.json(results[0]);
    });
};

const createRealTeam = (req, res) => {
    const { name, city } = req.body;
    const sql = "INSERT INTO RealTeams (name, city) VALUES (?, ?)";
    db.query(sql, [name, city], (err, result) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Team created", team_id: result.insertId });
    });
};

// ------------------ Players ------------------
const getAllPlayers = (req, res) => {
    const sql = "SELECT * FROM Players";
    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getPlayerById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Players WHERE player_id=?";
    db.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        if(results.length === 0) return res.status(404).json({ message: "Player not found" });
        res.json(results[0]);
    });
};

const createPlayer = (req, res) => {
    const { name, role, real_team_id } = req.body;
    const sql = "INSERT INTO Players (name, role, real_team_id) VALUES (?, ?, ?)";
    db.query(sql, [name, role, real_team_id], (err, result) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Player created", player_id: result.insertId });
    });
};

// ------------------ FantasyTeams ------------------
const getAllFantasyTeams = (req, res) => {
    const sql = "SELECT * FROM FantasyTeams";
    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getFantasyTeamById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM FantasyTeams WHERE fantasy_team_id=?";
    db.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        if(results.length === 0) return res.status(404).json({ message: "Fantasy team not found" });
        res.json(results[0]);
    });
};

const createFantasyTeam = (req, res) => {
    const { user_id, name, league_id } = req.body;
    const sql = "INSERT INTO FantasyTeams (user_id, name, league_id) VALUES (?, ?, ?)";
    db.query(sql, [user_id, name, league_id], (err, result) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Fantasy team created", fantasy_team_id: result.insertId });
    });
};

// ------------------ FantasyTeamPlayers ------------------
const getFantasyTeamPlayers = (req, res) => {
    const { fantasy_team_id } = req.params;
    const sql = `SELECT ftp.*, p.name AS player_name, p.role
                 FROM FantasyTeamPlayers ftp
                 JOIN Players p ON ftp.player_id = p.player_id
                 WHERE ftp.fantasy_team_id=?`;
    db.query(sql, [fantasy_team_id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addFantasyTeamPlayer = (req, res) => {
    const { fantasy_team_id, player_id } = req.body;
    const sql = "INSERT INTO FantasyTeamPlayers (fantasy_team_id, player_id) VALUES (?, ?)";
    db.query(sql, [fantasy_team_id, player_id], (err, result) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Player added", ftp_id: result.insertId });
    });
};

// ------------------ FantasyTransfers ------------------
const getFantasyTransfers = (req, res) => {
    const sql = "SELECT * FROM FantasyTransfers";
    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createFantasyTransfer = (req, res) => {
    const { fantasy_team_id, player_out_id, player_in_id, transfer_date } = req.body;
    const sql = "INSERT INTO FantasyTransfers (fantasy_team_id, player_out_id, player_in_id, transfer_date) VALUES (?, ?, ?, ?)";
    db.query(sql, [fantasy_team_id, player_out_id, player_in_id, transfer_date], (err, result) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Transfer created", transfer_id: result.insertId });
    });
};

// ------------------ FantasyTeamHistory ------------------
const getFantasyTeamHistory = (req, res) => {
    const { fantasy_team_id } = req.params;
    const sql = "SELECT * FROM FantasyTeamHistory WHERE fantasy_team_id=?";
    db.query(sql, [fantasy_team_id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ FantasyCaptainHistory ------------------
const getFantasyCaptainHistory = (req, res) => {
    const { fantasy_team_id } = req.params;
    const sql = "SELECT * FROM FantasyCaptainHistory WHERE fantasy_team_id=?";
    db.query(sql, [fantasy_team_id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

// ------------------ FantasyBudget ------------------
const getFantasyBudget = (req, res) => {
    const { fantasy_team_id } = req.params;
    const sql = "SELECT * FROM FantasyBudget WHERE fantasy_team_id=?";
    db.query(sql, [fantasy_team_id], (err, results) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json(results[0] || {});
    });
};

const updateFantasyBudget = (req, res) => {
    const { fantasy_team_id } = req.params;
    const { budget } = req.body;
    const sql = "UPDATE FantasyBudget SET budget=? WHERE fantasy_team_id=?";
    db.query(sql, [budget, fantasy_team_id], (err) => {
        if(err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Budget updated" });
    });
};

module.exports = {
    getAllRealTeams,
    getRealTeamById,
    createRealTeam,
    getAllPlayers,
    getPlayerById,
    createPlayer,
    getAllFantasyTeams,
    getFantasyTeamById,
    createFantasyTeam,
    getFantasyTeamPlayers,
    addFantasyTeamPlayer,
    getFantasyTransfers,
    createFantasyTransfer,
    getFantasyTeamHistory,
    getFantasyCaptainHistory,
    getFantasyBudget,
    updateFantasyBudget
};
