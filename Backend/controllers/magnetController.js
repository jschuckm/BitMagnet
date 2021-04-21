const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.addMagnet = (request, respond) => {
    const boardName = request.params.boardName;
    const magnetName = request.body.magnetName;
    const textMagnet = request.body.textMagnet;
    const xPosition = request.body.xPosition;
    const yPosition = request.body.yPosition;
    
    db.query("insert into magnet(magnetName, textMagnet, boardID, xPosition, yPosition) values (?, ?, (select boardID from boardSelection where boardName = ?), ?, ?);", [magnetName, textMagnet, boardName, xPosition, yPosition], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Add new Magnet")
            respond.json({
                message: "Add new Magnet"
            })
        }
    })
}

exports.deleteMagnet = (request, respond) => {
    //const boardName = request.params.boardName;
    const magnetName = request.body.magnetName;

    db.query("delete from magnet where magnetName = ?;", [magnetName], (error, reuslt) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Delete magnet");
            respond.json({
                message: "Delete magnet"
            })
        }
    });
};

exports.getAllMagnet = (request, respond) => {
    
    const boardID = request.params.boardName;
    var magnetList = [];
    db.query("select m.magnetName, m.textMagnet, m.xPosition, m.yPosition from magnet m  where boardID = (select boardID from boardSelection where boardName = ?);", [boardID], (error, result) => {
        if(error) {
            console.log(error);
        } else {            
            for(var i=0; i<result.length; i++) {
                magnetList.push({
                  magnetName  : result[i].magnetName,
                  textMagnet : result[i].textMagnet
                });
            }
            console.log("Return list of magnet");
            respond.json(result);
        }
    })
};