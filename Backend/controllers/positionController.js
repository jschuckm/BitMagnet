const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.updateImagePosition = (request, respond) => {
    // const boardName = request.params.boardName;
    const imageName = request.body.imageName;
    const xPosition = request.body.xPosition;
    const yPosition = request.body.yPosition;

    db.query("update imageTable set xPosition = ?, yPosition = ? where imageName= ?;", [xPosition,yPosition,imageName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Update image position");
            console.log(imageName);
            console.log(xPosition);
            console.log(yPosition);
            // console.log(result);
            respond.json({
                message : "Update position"
            })
        }
    })
};

exports.updateMagnetPosition = (request, respond) => {
    const magnetName = request.body.magnetName;
    const xPosition = request.body.xPosition;
    const yPosition = request.body.yPosition;

    db.query("update magnet set xPosition = ?, yPosition = ? where magnetName = ?;", [xPosition,yPosition,magnetName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Update text position");
            console.log(magnetName);
            console.log(xPosition);
            console.log(yPosition);
            // console.log(result);
            respond.json({
                message : "Update position"
            })
        }
    })
}