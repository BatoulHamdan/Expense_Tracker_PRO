const express = require("express");
const auth = require("../../Middleware/auth");
const addIncome = require("./Controllers/addIncome");
const addExpense = require("./Controllers/addExpense");
const getTransactions = require("./Controllers/getTransactions");
const deleteTransaction = require("./Controllers/deleteTransaction");

const transactionRoutes = express.Router();

// Routes...
transactionRoutes.use(auth);

// Protected routes...
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);
transactionRoutes.delete("/:transaction_id", deleteTransaction);

module.exports = transactionRoutes;
