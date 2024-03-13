const express = require("express");
const auth = require("../../Middleware/auth");
const addIncome = require("./Controllers/addIncome");

const transactionRoutes = express.Router();

// Routes...
transactionRoutes.use(auth);

// Protected routes...
transactionRoutes.post("/addIncome", addIncome);

module.exports = transactionRoutes;
