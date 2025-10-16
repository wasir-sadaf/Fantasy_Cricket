const db = require("../config/db");

const createLeague = (req,res) =>{
    const {name, type, created_by, start_date, last_date} = req.body;

    if(!name || !created_by){
        return res.status(400).json({ message: "name and created_by are required" });
    }

    const sql = "insert into Leagues (name, type, created_by, start_date, last_date) values (?,?,?,?,?)"
    db.query(sql, [name, type, created_by, start_date, last_date], (error, result)=>{
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "league created successfully", leagueId: result.insertId });
    })
}

const getAllLeague = (req,res) =>{
    const sql = "select * from Leagues";
    db.query(sql, (error, result) =>{
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    })

}

const getLeagueById = (req,res) =>{
    const {id} = req.params;

    const sql = "select * from Leagues where league_id = ?";
    db.query(sql, [id], (error,result)=>{
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        if(result.length === 0){
            return res.status(404).json({ message: "league not found" });
        }
        res.status(200).json(result[0]);
    })

}

module.exports = {createLeague, getAllLeague, getLeagueById}