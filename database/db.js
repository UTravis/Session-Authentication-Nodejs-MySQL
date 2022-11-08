const mysql = require("mysql");
const env = require('dotenv');

// Configuring .env
env.config()

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
})


db.connect();

module.exports = db;