const express = require("express");
const register = require("./Controllers/register");
const login = require("./Controllers/login");
const userDashboard = require("./Controllers/userDashboard");
const auth = require("../../Middleware/auth");

const usersRoutes = express.Router();

//Routes
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.use(auth);
usersRoutes.get("/dashboard", userDashboard);

module.exports = usersRoutes;
