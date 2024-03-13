require("express-async-errors");

const express = require("express");
const errorHandler = require("./Handlers/errorHandler");

const app = express();

app.use(express.json);


//Routes

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully");
});
