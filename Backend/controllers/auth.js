const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (request, respond) => {
    console.log(request.body);

    const users = request.body.users;
    const password = request.body.password;
    const firstName = request.body.FirstName;
    const lastName = request.body.LastName;

    //const {users, password, FirstName, LastName} = request.body;

    db.query('select users from account where users = ?;', [users], async (error, result) => {
        
        if(error) {
            console.log(error);
        } 

        if(result.length > 0) {
            return respond.render('register', {
                message: "That user is already in use"
            });
        } 

        let hashedPassword = await bcrypt.hash(password, 8);
        //console.log(hashedPassword);

        db.query("insert into account (users, `password`, FirstName, LastName) values (?,?,?,?);", [users, hashedPassword, firstName, lastName], (error, result) =>{
            if(error) {
                console.log(error)
            } else {
                console.log(result);
                return respond.render("register", {
                    message: "User registered"
                });
            }
        });

    });
}