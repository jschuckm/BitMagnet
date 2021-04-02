const { request, response } = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getFriends = (request, respond) => {
    const userID = request.body.userID;
    console.log(userID);
    var friendList = [];
    db.query("select * from friendslist where userID = ?;", [userID], (error, result) => {
        if(error) {
            console.log(error);
        } else {            
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
        const userID = request.body.userID;
        const friendID = request.body.friendID;

        db.query("insert into friendslist(userID, friendID) values(?, ?);", [userID, friendID], (error, result) =>{

            //TO-DO
            //ADDING AUTHENTICATION (CHECKING IF RESULT IS AN ACTUAL USERNAME)

            if(error) {
                console.log(error);
            } else {
                console.log("Friend relationship 1");
            }
        })
    
        db.query("insert into friendslist(userID, friendID) values(?, ?);", [friendID, userID], (error, result) =>{
            if(error) {
                console.log(error);
            } else {
                console.log("Friend relationship 2");
            }
        })
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteFriend = (request, respond) => {

    try{
        const friendID= request.body.friendID;

        db.query("delete from friendslist where friendID = ?;", [friendID], (error, result) => {

            //TO-DO
            //DELETE AUTHENTICATION (CHECKING IF RESULT IS AN ACTUAL USERNAME)
            

            if(error) {
                console.log(error);
            } else {
                console.log("Delete friend");
            }
        })
    }
    catch(error){
        console.log(error);
    }
}