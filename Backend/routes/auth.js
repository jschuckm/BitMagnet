const express = require("express");
const authController = require("../controllers/userController");
const boardController = require("../controllers/boardController");
const friendController = require("../controllers/friendController");

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
router.post("/:id/addBoard", friendController.addFriend);

            //auth/:id/deleteFriend
router.post("/:id/deleteBoard", friendController.deleteFriend);

module.exports = router;