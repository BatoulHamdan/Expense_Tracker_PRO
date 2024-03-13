const express = require("express");
const register = require("./Controllers/register");
const login = require("./Controllers/login");
const userDashboard = require("./Controllers/userDashboard");

const usersRoutes = express.Router();

//Routes
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.get("/dashboard", userDashboard);

module.exports = usersRoutes;
