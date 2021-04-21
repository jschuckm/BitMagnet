const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.uploadImage = (request, respond) => {
    const fileName = request.file.filename;
    const filePath = request.file.path;
    const boardName = request.params.boardName;

    db.query("insert into imageTable(imageName, imageURL, boardID, xPosition, yPosition) values (?, ?, (select boardID from boardSelection where boardName = ?), (select RAND() * 250), (select RAND() * 300));", [fileName, filePath, boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("insert Image path");
            respond.json({
                message: "insert image"
            })
        }
    })
    
}

exports.getImage = (request, respond) => {
    const boardName = request.params.boardName;
    console.log(boardName);

    db.query("select imageName, xPosition, yPosition from imageTable where boardID = (select boardID from boardSelection where boardName = ?);", [boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("return Image path");
            respond.json(result);
        }
    })
}

exports.deleteImage = (request, respond) => {
    const boardName = request.params.boardName;
    const imageName = request.body.imageName;
    console.log(boardName);
    console.log(imageName);
    db.query("delete from imageTable where imageName = ? and boardID = (select boardID from boardSelection where boardName = ?);", [imageName, boardName], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Delete Image");
            respond.json({
                message: "Delete Image"
            })
        }
    })
}
