const express = require("express");
const authController = require("../controllers/userController");
const boardController = require("../controllers/boardController");
const friendController = require("../controllers/friendController");
const magnetController = require("../controllers/magnetController");
const imageController = require("../controllers/imageController");
const positionController = require("../controllers/positionController");
const multer = require('multer');

const router = express.Router();

// --- user controller part ---
            //auth/register
router.post("/register", authController.register);
            //auth/login
router.post("/login", authController.login);
            //auth/:id/deleteAccount
router.get("/:id/deleteAccount", authController.deleteUser);


// --- friend controller part ---
            //auth/:id/getFriends
router.get("/:id/getFriends", friendController.getFriends);
            //auth/:id/addFriend
router.post("/:id/addFriend", friendController.addFriend);
            //auth/:id/deleteFriend
router.post("/:id/deleteFriend", friendController.deleteFriend);


// --- board selection part ---
            //auth/:id/main
router.get("/:id/main", boardController.getAllBoard);
            //auth/:id/addBoard
router.post("/:id/addBoard", boardController.addBoard);
            //auth/:id/addBoardShare
router.post("/:id/addBoardShare", boardController.addBoardShare);
            //auth/:id/deleteBoard
router.post("/:id/deleteBoard", boardController.deleteBoard);
            //:boardName/getUsers
router.get("/:boardName/getUsers", boardController.getUsers); //show board members  


// --- text Magnet part --- 
            //:boardName/addMagnet
router.post("/:boardName/addMagnet", magnetController.addMagnet);
            //:boardName/deleteMagnet
router.post("/:boardName/deleteMagnet", magnetController.deleteMagnet);
            //:boardName/getAllMagnet
router.get("/:boardName/getAllMagnet", magnetController.getAllMagnet);


// --- image Magnet part ---
//upload image file
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../Frontend/my-app/build/images')
        }, 
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});
            //:boardName/uploadImage 
router.post("/:boardName/uploadImage", upload.single('file'), imageController.uploadImage); //upload image 
            //:boardName/getIamge 
router.get("/:boardName/getImage", imageController.getImage); //get image path
            //:boardName/deleteIamge
router.post("/:boardName/deleteImage", imageController.deleteImage); //delete image


// --- Updata Position of Magnet ---
            //:boardName/updateImagePosition
router.post("/:boardName/updateImagePosition", positionController.updateImagePosition); //update Position
            //:boardName/updateMagnetPosition
router.post("/:boardName/updateMagnetPosition", positionController.updateMagnetPosition); 


module.exports = router;
