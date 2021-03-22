const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();
            //auth/register
router.post("/register", authController.register);

            //auth/login
router.post("/login", authController.login);

module.exports = router;