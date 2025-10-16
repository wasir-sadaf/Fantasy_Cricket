const db = require("../config/db");

const createFixture = (req, res) => {
    const { match_id, week_id, status } = req.body;

    if (!match_id || !week_id) {
        return res.status(400).json({ message: "match_id and week_id are required" });
    }

    const sql = "insert into Fixtures (match_id, week_id, status) values (?, ?, ?)";
    db.query(sql, [match_id, week_id, status || 'scheduled'], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "Fixture created successfully", fixtureId: result.insertId });
    });
}

const getAllFixtures = (req, res) => {
    const sql = "select * from Fixtures";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getFixtureById = (req, res) => {
    const { id } = req.params;
    const sql = "select * from Fixtures where fixture_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Fixture not found" });
        }
        res.status(200).json(result[0]);
    });
}

const updateFixture = (req, res) => {
    const { id } = req.params;
    const { match_id, week_id, status } = req.body;

    const sql = "update Fixtures set match_id = ?, week_id = ?, status = ? where fixture_id = ?";
    db.query(sql, [match_id, week_id, status, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Fixture updated successfully" });
    });
}

const deleteFixture = (req, res) => {
    const { id } = req.params;
    const sql = "delete from Fixtures where fixture_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json({ message: "Fixture deleted successfully" });
    });
}

module.exports = { createFixture, getAllFixtures, getFixtureById, updateFixture, deleteFixture };
