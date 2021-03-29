const express = require("express");
const authController = require("../controllers/userController");
const boardController = require("../controllers/boardController");

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

module.exports = router;