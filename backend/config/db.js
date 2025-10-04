const mysql = require("mysql2");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "hereisdatabase",
    database : "fan_cricket"
})

db.connect((error)=>{
    if (error) return console.log(error);
    console.log("connected to the database!");
})

module.exports = db;