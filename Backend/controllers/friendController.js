const { request, response } = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getFriends = (request, respond) => {

    const userId = request.params.id;
    var friendList = [];
    db.query("select * from friends where userId = ?;", [userId], (error, result) => {
        if(error) {
            console.log(error);
        } else {            
            for(var i=0; i<result.length; i++) {
                friendList.push({friend: result[i].friend});
            }
            console.log("Return list of friends");
            respond.json(friendList);
        }
    })

};

exports.addFriend = (request, respond) => {

    const userId = request.params.id;
    const friend = request.body.friend;

    db.query("insert into friends(friend) values (?);", [friend], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Insert new Friend");
            respond.json({
                message: "Insert new Friend"
            })
        }
    })
};

exports.deleteFriend = (request, respond) => {

    const friend = request.body.friend;

    db.query("delete from friends where friend = ?;", [friend], (error, result) => {
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