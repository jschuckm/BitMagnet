const express = require("express");
const authController = require("../controllers/userController");
const boardController = require("../controllers/boardController");
const friendController = require("../controllers/friendController");
const magnetController = require("../controllers/magnetController");
const imageController = require("../controllers/imageController");
const multer = require('multer');

const router = express.Router();

            //auth/register
router.post("/register", authController.register);

            //auth/login
router.post("/login", authController.login);

            //auth/:id/main
router.get("/:id/main", boardController.getAllBoard);

            //auth/:id/addBoard
router.post("/:id/addBoard", boardController.addBoard);

            //auth/:id/deleteBoard
router.post("/:id/deleteBoard", boardController.deleteBoard);

            //auth/:id/getFriends
router.get("/:id/getFriends", friendController.getFriends);

            //auth/:id/addFriend
router.post("/:id/addFriend", friendController.addFriend);

            //auth/:id/deleteFriend
router.post("/:id/deleteFriend", friendController.deleteFriend);

            //:boardName/addMagnet
router.post("/:boardName/addMagnet", magnetController.addMagnet);

            //:boardName/deleteMagnet
router.post("/:boardName/deleteMagnet", magnetController.deleteMagnet);

            //:boardName/getAllMagnet
router.get("/:boardName/getAllMagnet", magnetController.getAllMagnet);


//upload image file
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../Frontend/my-app/build/images')
            // cb(null, '../Backend/image')
            // if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            //     cb(null, '../Backend/image')
            // } else {
            //     console.log("wrong image format.Please check image format (jpeg, jpg, or png)")
            // }
        }, 
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
});
            //:boardName/uploadImage
router.post("/:boardName/uploadImage", upload.single('file'), imageController.uploadImage); //upload image 


router.get("/:boardName/getImage", imageController.getImage); //get image path

module.exports = router;
