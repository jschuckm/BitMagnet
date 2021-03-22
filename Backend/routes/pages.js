const express = require("express");

const router = express.Router();

router.get("/", (request, respond) => {
    respond.render("index");
});

router.get("/register", (request, respond) => {
    respond.render("register");
});

router.get("/login", (request, respond) => {
    respond.render("login");
});

module.exports = router;