const express = require("express");
const register = require("./Controllers/register");
const login = require("./Controllers/login");

const usersRoutes = express.Router();

//Routes
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);

module.exports = usersRoutes;
