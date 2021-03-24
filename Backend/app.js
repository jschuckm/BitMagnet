const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: './.env'})
const path = __dirname + '/views/';
console.log(__dirname);
const app = express();
app.use(express.static(path));


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// const publicDirectory = path.join(__dirname, './public'); //need to adjust
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs'); //need to adjust

db.connect( (error) => {
    if(!error) {
        console.log("MySQL Database is connected ... ");
      } else {
        console.log("Error connecting database ... \n 1. Check whether ISU VPN turn on or off \n 2. Check right db info (host, user, password, database ...) ");
      }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(8000, () => {
    console.log("Server started on Port 8000");
})