const mysql = require("mysql2");


const db = mysql.createPool({
    host: "localhost",   
    user: "root",        
    password: "1234567", 
    database: "petshop"  
});


module.exports = db;
