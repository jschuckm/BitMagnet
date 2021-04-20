const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.updatePosition = (request, respond) => {
    const boardName = request.params.boardName;
    const nameMagnet = request.body.nameMagnet;
    const xPosition = request.body.xPosition;
    const yPosition = request.body.yPosition;

    db.query("select * from positionTable where name = ? and boardName = ?;", [nameMagnet, boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else if(result.length > 1) {
            console.log("Error: length is over 1")
        } else if(result.length == 0) {
            db.query("insert into positionTable(name, boardName, xPosition, yPosition) values (?, ?, ?, ?);", [nameMagnet, boardName, xPosition, yPosition], (error, result) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(result);
                    respond.json({
                        message : "Add position"
                    })
                }
            })
        } else if(result.length == 1) {
            db.query("update positionTable set xPosition = ?, yPosition = ? where name=? and boardName=?;", [xPosition,yPosition,nameMagnet,boardName], (error, result) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(result);
                    respond.json({
                        message : "Update position"
                    })
                }
            })
        }
    })
};

exports.getPosition = (request, respond) => {
    const boardName = request.params.boardName;
    const nameMagnet = request.body.nameMagnet;

    db.query("select xPosition, yPosition from positionTable where name=? and boardName=? ;", [nameMagnet, boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log(result);
            respond.json(result);
        }
    })
};
