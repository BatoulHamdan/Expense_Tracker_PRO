require("express-async-errors");

const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");

const usersRoutes = require("./Modules/Users/usersRoutes.js");

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

app.use(express.json());

//Routes
app.use("/api/users", usersRoutes);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully!");
});
