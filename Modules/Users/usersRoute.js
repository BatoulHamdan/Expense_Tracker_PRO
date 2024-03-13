const express = require("express");
const register = require("./Controllers/register");

const usersRoutes = express.Router();

//Routes
usersRoutes.post("/register", register);

module.exports = usersRoutes;
