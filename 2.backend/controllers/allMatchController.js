const db = require("../config/db.js");

// ------------------ Matches ------------------
const getAllMatches = (req, res) => {
    const sql = "SELECT * FROM Matches";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getMatchById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Matches WHERE match_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Match not found" });
        res.json(results[0]);
    });
};

const createMatch = (req, res) => {
    const { fixture_id, venue_id, match_date, match_time } = req.body;
    const sql = "INSERT INTO Matches (fixture_id, venue_id, match_date, match_time) VALUES (?, ?, ?, ?)";
    db.query(sql, [fixture_id, venue_id, match_date, match_time], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Match created", match_id: result.insertId });
    });
};

const updateMatch = (req, res) => {
    const { id } = req.params;
    const { fixture_id, venue_id, match_date, match_time } = req.body;
    const sql = "UPDATE Matches SET fixture_id=?, venue_id=?, match_date=?, match_time=? WHERE match_id=?";
    db.query(sql, [fixture_id, venue_id, match_date, match_time, id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Match updated successfully" });
    });
};

const deleteMatch = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Matches WHERE match_id=?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Match deleted successfully" });
    });
};

// ------------------ Fixtures ------------------
const getAllFixtures = (req, res) => {
    const sql = "SELECT * FROM Fixtures";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getFixtureById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Fixtures WHERE fixture_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Fixture not found" });
        res.json(results[0]);
    });
};

const createFixture = (req, res) => {
    const { home_team_id, away_team_id, week_id } = req.body;
    const sql = "INSERT INTO Fixtures (home_team_id, away_team_id, week_id) VALUES (?, ?, ?)";
    db.query(sql, [home_team_id, away_team_id, week_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Fixture created", fixture_id: result.insertId });
    });
};

// ------------------ Venues ------------------
const getAllVenues = (req, res) => {
    const sql = "SELECT * FROM Venues";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createVenue = (req, res) => {
    const { name, location, capacity } = req.body;
    const sql = "INSERT INTO Venues (name, location, capacity) VALUES (?, ?, ?)";
    db.query(sql, [name, location, capacity], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Venue created", venue_id: result.insertId });
    });
};

// ------------------ MatchOfficials ------------------
const getAllMatchOfficials = (req, res) => {
    const sql = "SELECT * FROM MatchOfficials";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createMatchOfficial = (req, res) => {
    const { name, role } = req.body;
    const sql = "INSERT INTO MatchOfficials (name, role) VALUES (?, ?)";
    db.query(sql, [name, role], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Match official created", official_id: result.insertId });
    });
};

// ------------------ MatchOfficialsAssignment ------------------
const getAllAssignments = (req, res) => {
    const sql = `
        SELECT moa.*, mo.name AS official_name, mo.role 
        FROM MatchOfficialsAssignment moa
        JOIN MatchOfficials mo ON moa.official_id = mo.official_id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const assignOfficial = (req, res) => {
    const { match_id, official_id } = req.body;
    const sql = "INSERT INTO MatchOfficialsAssignment (match_id, official_id) VALUES (?, ?)";
    db.query(sql, [match_id, official_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Official assigned", assignment_id: result.insertId });
    });
};

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
    getAllFixtures,
    getFixtureById,
    createFixture,
    getAllVenues,
    createVenue,
    getAllMatchOfficials,
    createMatchOfficial,
    getAllAssignments,
    assignOfficial
};
