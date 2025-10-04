const db = require("../config/db.js");

const signup = (req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: "all fields are required" });
    }

    const sql = "insert into Users (name,email,password) values (?,?,?)" ;
    db.query(sql, [name,email,password], (error, result)=>{
        if(error) {
            console.log(error);
            return res.status(500).json({ error: "database error" });
        }
        res.status(201).json({ message: "User created successfully", userId: result.insertId });
    })
}

const login = (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "select * from Users where email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    });
}

module.exports = {signup, login};