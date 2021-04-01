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
    var boardList = [];
    db.query("select b.boardName from account a, boardSelection b, userBoardRelationship ub where a.users = ub.userID and b.boardID = ub.boardID and ub.userID = ?;", [userId], (error, result) => {
        if(error) {
            console.log(error);
        } else {            
            for(var i=0; i<result.length; i++) {
                boardList.push({boardName: result[i].boardName});
            }
            console.log("Return list of board");
            respond.json(boardList);
        }
    })

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

    const boardName = request.body.boardName;

    db.query("delete from boardSelection where boardName = ?;", [boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Delete board");
            respond.json({
                message: "Delete that board"
            })
        }
    })
}