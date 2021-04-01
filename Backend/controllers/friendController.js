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
    var friendList = [];
    db.query("select * from friendslist where userID = ?;", [userID], (error, result) => {
        if(error) {
            console.log(error);
        } else {            
            for(var i=0; i<result.length; i++) {
                friendList.push({friendID: result[i].friendID});
            }
            console.log("Return list of friends");
            respond.json(friendList);
        }
    })

};

exports.addFriend = (request, respond) => {

    const userID = request.params.id;
    const friendID = request.body.friendID;

    db.query("insert into friendslist(userID, friendID) values(?, ?);", [userID, friendID], (error, result) =>{
        if(error) {
            console.log(error);
        } else {
            console.log("Friend relationship");
        }
    })
};

exports.deleteFriend = (request, respond) => {

    db.query("delete from friendslist where friendID = ?;", [friendID], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Delete friend");
            respond.json({
                message: "Delete that friend"
            })
        }
    })
};