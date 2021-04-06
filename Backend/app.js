const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: './.env'})


//db setting
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error) => {
  if(!error) {
      console.log("MySQL Database is connected ... ");
    } else {
      console.log("Error connecting database ... \n 1. Check whether ISU VPN turn on or off \n 2. Check right db info (host, user, password, database ...) ");
    }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//path
const path = "../Frontend/my-app/build"
//const path = "../Frontend/my-app/public"
app.use(express.static(path)) //render main page (login)
app.get('/', function (req,res) {
  res.sendFile(path);
});

//Define Routes
//app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/board', require('./routes/auth'));




//for team server
const http = require("http");
const hostname = "coms-319-g14.cs.iastate.edu"
const port = 8000;

http.createServer(app).listen(port, function(){
  console.log("Server started on Port 8000");
})

// app.listen(8000, () => {
//     console.log("Server started on Port 8000");
// })

module.exports = app