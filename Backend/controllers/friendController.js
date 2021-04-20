const { request, response } = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getFriends = (request, respond) => {
    const userID = request.params.id;
    console.log(userID);
    var friendList = [];
    db.query("select * from friendslist where userID = ?;", [userID], (error, result) => {
        if(error) {
            console.log(error);
        } else {     
            console.log(result.length);     
            for(var i=0; i<result.length; i++) {
                friendList.push({friendID: result[i].friendID});
            }
            console.log("Return list of friends");
            console.log(friendList);
            respond.json(friendList);
        }
    })

}

exports.addFriend = (request, respond) => {
    try{
        const userID = request.params.id;
        const friendID = request.body.friendID;

        db.query("insert into friendslist(userID, friendID) values(?, ?);", [userID, friendID], (error, result) =>{

            if(error){
                respond.json({"usernameStatus": false})
            }
            else{
                respond.json({
                    "usernameStatus": true,
                    message: "username successful"
                });
            }
        })
        db.query("insert into friendslist(userID, friendID) values(?, ?);", [friendID, userID], (error, result) =>{
            
        })
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteFriend = (request, respond) => {

    try{
        const userID = request.params.id;
        const friendID = request.body.friendID;
        db.query("delete from friendslist where friendID = ? and userID =?;", [friendID, userID], (error, result) => {
            if(result.affectedRows == 0){
                respond.json({"usernameStatus2": false})
            }
            else{
                respond.json({
                    "usernameStatus2": true,
                    message: "username successful"
                });
            }
        })
        db.query("delete from friendslist where friendID = ? and userID =?;", [userID, friendID], (error, result) => {
            
        })
    }
    catch(error){
        console.log(error);
    }
}