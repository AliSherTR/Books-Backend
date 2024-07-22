const express = require("express");
const booksRouter = require("./routes/BookRoutes");
const userRouter = require("./routes/UserRoutes");
const GlobalErrorHandler = require("./controllers/errorController");
const rentalRoutes = require("./routes/RentalRoutes");

const app = express();

app.use(express.json());

app.use("/", booksRouter);
app.use("/", userRouter);
app.use("/", rentalRoutes);

app.use(GlobalErrorHandler);
module.exports = app;
