const db = require("../config/db");

const createTeam = (req,res)=>{
    const { name, country, league_id } = req.body;

    if(!name || !country || !league_id){
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "insert into RealTeams (name, country, league_id) values (?, ?, ?)";
    db.query(sql, [name, country, league_id], (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "team created successfully", teamId: result.insertId });
    });
}

const getAllTeams = (req,res)=>{
    const sql = "select * from RealTeams";
    db.query(sql, (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(200).json(result);
    });
}

const getTeamById = (req,res)=>{
    const { id } = req.params;

    const sql = "select * from RealTeams where real_team_id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "team not found" });
        }

        res.status(200).json(result[0]);
    });
}

const updateTeam =(req,res)=>{
    const {id} = req.params;
    const {name, country, league_id} = req.body;

    const sql = "update RealTeams set name = ?, country = ?, league_id = ? where real_team_id = ?";
    db.query(sql, [name,country,league_id,id], (error,result)=>{
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }

        res.status(200).json({ message: "team updated successfully" });
    })
}

const deleteTeam = (req,res) =>{
    const {id} = req.params;

    const sql = "delete from RealTeams where real_team_id = ?";
    db.query(sql, [id], (error,result)=>{
        if(error){
            console.log(error);
            return res.status(500).json({error: "database error"});
        }
        res.status(200).json({message: "deleted successfully"});
    })
}

module.exports = {createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam};