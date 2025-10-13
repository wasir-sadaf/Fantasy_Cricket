const db = require("../config/db");

const createVenue = (req,res) =>{
    const { name, city, country, capacity } = req.body;

    if (!name || !city || !country || !capacity) {
        return res.status(400).json({ message: "all fields are required" });
    }

    const sql = "insert into Venues (name, city, country, capacity) values (?, ?, ?, ?)";
    db.query(sql, [name, city, country, capacity], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "venue created successfully", venue_id: result.insertId });
    });
}

const getAllVenues = (req,res) =>{
    const sql = "select * from Venues";
    db.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getVenueById = (req,res) =>{
    const { id } = req.params;

    const sql = "select * from Venues where venue_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "venue not found" });
        }

        res.status(200).json(result[0]);
    });
}

const updateVenue = (req,res) =>{
    const { id } = req.params;
    const { name, city, country, capacity } = req.body;

    const sql = "update Venues set name = ?, city = ?, country = ?, capacity = ? where venue_id = ?";
    db.query(sql, [name, city, country, capacity, id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        res.status(200).json({ message: "venue updated successfully" });
    });
}

const deleteVenue = (req,res) =>{
    const { id } = req.params;

    const sql = "delete from Venues where venue_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        res.status(200).json({ message: "venue deleted successfully" });
    });
}

module.exports = {createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue};