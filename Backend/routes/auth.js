const express = require("express");
const authController = require("../controllers/userController");
const boardController = require("../controllers/boardController");
const friendController = require("../controllers/friendController");
const magnetController = require("../controllers/magnetController");

const router = express.Router();

            //auth/register
router.post("/register", authController.register);

            //auth/login
router.post("/login", authController.login);

            //auth/:id/main
router.post("/:id/main", boardController.getAllBoard);

            //auth/:id/addBoard
router.post("/:id/addBoard", boardController.addBoard);

            //auth/:id/deleteBoard
router.post("/:id/deleteBoard", boardController.deleteBoard);

            //auth/:id/getFriends
router.post("/:id/getFriends", friendController.getFriends);

            //auth/:id/addFriend
router.post("/:id/addFriend", friendController.addFriend);

            //auth/:id/deleteFriend
router.post("/:id/deleteFriend", friendController.deleteFriend);

            //auth/:boardName/addMagnet
router.post("/:boardName/addMagnet", magnetController.addMagnet);

            //auth/:boardName/deleteMagnet
router.post("/:boardName/deleteMagnet", magnetController.deleteMagnet);

            //auth/:boardName/getAllMagnet
router.get("/:boardName/getAllMagnet", magnetController.getAllMagnet);

module.exports = router;