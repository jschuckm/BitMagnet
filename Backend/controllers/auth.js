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

    db.query("select users from account where users = ?;", [users], async (error, result) => {
        
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

exports.login = async (request, respond) => {
    try {
        const { users, password } = request.body;

        if( !users || !password ) {
            return request.status(400).render('login', {
                message: "Please provide an users and passwrod"
            })
        }

        db.query("select * from account where users = ?;", [users], async (error, result) => {
            console.log(result);
            if( !result || !(await bcrypt.compare(password, result[0].password))) {
                respond.status(401).render("login", {
                    message: "ID or Password is incorrect"
                })
            } else {
                const users = result[0].users;

                const token = jwt.sign({users: users}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ), 
                    httpOnly: true
                }

                respond.cookie("jwt", token, cookieOptions);
                respond.status(200).redirect("/");

            }

        });

    } catch (error) {
        console.log(error);
    }
}