const express = require("express");
const booksRouter = require("./routes/BookRoutes");
const GlobalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use("/", booksRouter);

app.use(GlobalErrorHandler);
module.exports = app;
