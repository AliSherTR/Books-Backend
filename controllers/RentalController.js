const Rental = require("../models/RentalModel");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const createHttpError = require("http-errors");

exports.rentBook = catchAsync(async (req, res, next) => {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    const user = await User.findById(req.user._id);

    if (!book) {
        return next(createHttpError(404, "No book found with that ID"));
    }

    if (!user) {
        return next(createHttpError(404, "No user found with that ID"));
    }

    const rental = await Rental.create({
        book: bookId,
        bookName: book.name,
        user: req.user._id,
        userName: req.user.username,
        userEmail: req.user.email,
    });

    res.status(201).json({
        status: "success",
        data: rental,
    });
});
