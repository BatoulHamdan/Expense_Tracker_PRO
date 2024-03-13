const express = require("express");
const auth = require("../../Middleware/auth");
const addIncome = require("./Controllers/addIncome");
const addExpense = require("./Controllers/addExpense");

const transactionRoutes = express.Router();

// Routes...
transactionRoutes.use(auth);

// Protected routes...
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);

module.exports = transactionRoutes;
