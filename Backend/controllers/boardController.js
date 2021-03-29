const { request, response } = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getAllBoard = (request, respond) => {

    
    const userId = request.params.id;
    // if(test) {
    //     console.log("Hello this is board main: " + id);
    // } else {
    //     console.log("error");
    // }
    
};

exports.addBoard = (request, respond) => {

    const userId = request.params.id;
    const boardName = request.body.boardName;

    //add new board into boardSelection table
    db.query("insert into boardSelection(boardName) values (?);", [boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Insert new Board");
            respond.json({
                message: "Insert new Board"
            })
        }
    } )

    //make relationship between new board and user and add it into userBoardRelationship table
    db.query("insert into userBoardRelationship(userID, boardID) values (?, (select boardID from boardSelection where boardName = ?));", [userId, boardName], (error, result) =>{
        if(error) {
            console.log(error);
        } else {
            console.log("Make relationship");
        }
    })
}

exports.deleteBoard = (request, respond) => {

}