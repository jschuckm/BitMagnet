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

    db.query("select users from account where users = ?;", [users], async (error, result) => {
        
        if(error) {
            console.log(error);
        } 

        if(result.length > 0) {
            console.log("That user is already in use");
            respond.json({
                "insertID": false,
                message: "That user ID is already in use"
            })
        } 
        let hashedPassword = await bcrypt.hash(password, 8);

        db.query("insert into account (users, `password`, FirstName, LastName) values (?,?,?,?);", [users, hashedPassword, firstName, lastName], (error, result) =>{
            if(error) {
                console.log(error)
            } else {
                console.log(result);
                console.log("User registered")
                respond.json({
                    "insertID": true,
                    message : "User registered"
                })
            }
        });

    });
}

exports.login = async (request, respond) => {
    try {
        const { users, password } = request.body;

        if( !users || !password ) {
            respond.json({"loginStatus": false})
        }

        db.query("select * from account where users = ?;", [users], async (error, result) => {
            if( result.length == 0) {
                console.log("wrong id");
                respond.json({
                    "loginStatus": false,
                    message: "wrong ID or Password"
                })
            }

            if( !result || !(await bcrypt.compare(password, result[0].password))) {
                respond.json({
                    "loginStatus": false,
                    message: "wrong ID or Password"
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
                respond.json({
                    "loginStatus": true,
                    message: "login successful"
                });
                //respond.status(200).redirect("/");  //reconnect main page or the user's main board page
            }

        });

    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async (request, respond) => {
    const userID = request.params.id;
    db.query("delete from account where users=?;", [userID], (error, result) => {
        if(error) {
            console.log(error)
        } else {
            respond.json({
                message: "delete user"
            });
        }
    })
}