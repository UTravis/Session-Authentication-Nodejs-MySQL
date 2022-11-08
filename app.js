const express = require('express')
const env =  require("dotenv");
const router = require('./routes/routes');
const session = require('express-session');
const MySQLStore =  require("express-mysql-session")
const ejs = require('ejs');
const flash = require('connect-flash')

const app = express()

//configuring ENV
env.config()

const port = process.env.PORT

// Configuring View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())  // Parsing json
app.use(flash()) // Creating flash session

// MySQL Session Store
var options = {
	host: process.env.DB_HOST,
	port: 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE,
    createDatabaseTable: true,
    clearExpired: true
};

var sessionStore = new MySQLStore(options)

// Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

app.listen(port, () => console.log(`Application listening on port ${port}!`))

// Routes
app.use(router)
