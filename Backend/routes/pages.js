const express = require("express");
const path = __dirname + '/views/';
const router = express.Router();

router.get("/", (request, respond) => {
    respond.render("");
});

router.get("/register", (request, respond) => {
    respond.render("register");
});

router.get("/login", (request, respond) => {
    respond.render("login");
});

router.get("/board", (request, respond) => {
    respond.sendFile(path + "/board");
});

module.exports = router;