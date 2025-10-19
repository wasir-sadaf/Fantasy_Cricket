const db = require("../config/db.js");

// ------------------ Leagues ------------------
const getAllLeagues = (req, res) => {
    const sql = "SELECT * FROM Leagues";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getLeagueById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Leagues WHERE league_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "League not found" });
        res.json(results[0]);
    });
};

const createLeague = (req, res) => {
    const { name, type, start_date, end_date } = req.body;
    const sql = "INSERT INTO Leagues (name, type, start_date, end_date) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, type, start_date, end_date], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "League created", league_id: result.insertId });
    });
};

const updateLeague = (req, res) => {
    const { id } = req.params;
    const { name, type, start_date, end_date } = req.body;
    const sql = "UPDATE Leagues SET name=?, type=?, start_date=?, end_date=? WHERE league_id=?";
    db.query(sql, [name, type, start_date, end_date, id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "League updated successfully" });
    });
};

const deleteLeague = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Leagues WHERE league_id=?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "League deleted successfully" });
    });
};

// ------------------ FantasyPrivateLeagues ------------------
const getAllFantasyPrivateLeagues = (req, res) => {
    const sql = "SELECT * FROM FantasyPrivateLeagues";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getFantasyPrivateLeagueById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM FantasyPrivateLeagues WHERE fpl_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Fantasy league not found" });
        res.json(results[0]);
    });
};

const createFantasyPrivateLeague = (req, res) => {
    const { league_id, name, password, entry_fee } = req.body;
    const sql = "INSERT INTO FantasyPrivateLeagues (league_id, name, password, entry_fee) VALUES (?, ?, ?, ?)";
    db.query(sql, [league_id, name, password, entry_fee], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Fantasy league created", fpl_id: result.insertId });
    });
};

// ------------------ FantasyPrivateLeagueMembers ------------------
const getMembers = (req, res) => {
    const { fpl_id } = req.params;
    const sql = `
        SELECT fplm.member_id, u.name, u.email 
        FROM FantasyPrivateLeagueMembers fplm
        JOIN Users u ON fplm.user_id = u.user_id
        WHERE fplm.fpl_id=?
    `;
    db.query(sql, [fpl_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addMember = (req, res) => {
    const { fpl_id, user_id } = req.body;
    const sql = "INSERT INTO FantasyPrivateLeagueMembers (fpl_id, user_id) VALUES (?, ?)";
    db.query(sql, [fpl_id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Member added", member_id: result.insertId });
    });
};

// ------------------ EntryFees ------------------
const getEntryFees = (req, res) => {
    const sql = "SELECT * FROM EntryFees";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createEntryFee = (req, res) => {
    const { fpl_id, amount } = req.body;
    const sql = "INSERT INTO EntryFees (fpl_id, amount) VALUES (?, ?)";
    db.query(sql, [fpl_id, amount], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Entry fee created", fee_id: result.insertId });
    });
};

// ------------------ Prizes ------------------
const getPrizes = (req, res) => {
    const sql = "SELECT * FROM Prizes";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createPrize = (req, res) => {
    const { fpl_id, position, amount } = req.body;
    const sql = "INSERT INTO Prizes (fpl_id, position, amount) VALUES (?, ?, ?)";
    db.query(sql, [fpl_id, position, amount], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Prize created", prize_id: result.insertId });
    });
};

// ------------------ Sponsorships ------------------
const getSponsorships = (req, res) => {
    const sql = "SELECT * FROM Sponsorships";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createSponsorship = (req, res) => {
    const { league_id, sponsor_name, amount } = req.body;
    const sql = "INSERT INTO Sponsorships (league_id, sponsor_name, amount) VALUES (?, ?, ?)";
    db.query(sql, [league_id, sponsor_name, amount], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Sponsorship created", sponsorship_id: result.insertId });
    });
};

// ------------------ Ads ------------------
const getAds = (req, res) => {
    const sql = "SELECT * FROM Ads";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createAd = (req, res) => {
    const { league_id, ad_text, image_url } = req.body;
    const sql = "INSERT INTO Ads (league_id, ad_text, image_url) VALUES (?, ?, ?)";
    db.query(sql, [league_id, ad_text, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Ad created", ad_id: result.insertId });
    });
};

module.exports = {
    getAllLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
    getAllFantasyPrivateLeagues,
    getFantasyPrivateLeagueById,
    createFantasyPrivateLeague,
    getMembers,
    addMember,
    getEntryFees,
    createEntryFee,
    getPrizes,
    createPrize,
    getSponsorships,
    createSponsorship,
    getAds,
    createAd
};
