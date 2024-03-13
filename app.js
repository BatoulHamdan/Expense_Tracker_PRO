require("express-async-errors");

const express = require("express");
const errorHandler = require("./Handlers/errorHandler");
const mongoose = require("mongoose");

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

app.use(express.json());

//Routes

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully!");
});
