require("express-async-errors");

const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");

const usersRoutes = require("./Modules/Users/usersRoutes");
const transactionsRoutes = require("./Modules/Transactions/transactionsRoutes");

require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Connected to mongoose successfully!");
  })
  .catch(() => {
    console.log("Connection to mongoose failed!");
  });

//Models
require("./Models/usersModel");
require("./Models/transactionsModel");

app.use(express.json()); //middleware that allowed us to access json data from payload

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);

app.use(errorHandler); //middleware

app.listen(8000, () => {
  console.log("Server started successfully!");
});
