const createError = require("http-errors");
const catchAsync = require("../utils/catchAsync");
const Book = require("../models/BookModel");

exports.getBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find();
    if (!books.length) return next(new createError(404, "No Books found"));
    return res.status(200).json({
        status: "success",
        data: books,
    });
});

exports.addBook = catchAsync(async (req, res) => {
    const { name, author, isbnNumber } = req.body;
    const newBook = await Book.create({
        name,
        authorName: author,
        ISBNNumber: isbnNumber,
    });

    return res.status(201).json({
        status: "success",
        data: {
            book: newBook,
        },
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) return next(createError(404, "No book found"));

    return res.status(200).json({
        status: "success",
        data: book,
    });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return next(createError(404, "No book found"));
    return res.status(200).json({
        status: "success",
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedBook) {
        return next(createHttpError(404, "No book found with that ID"));
    }

    res.status(200).json({
        status: "success",
        data: {
            book: updatedBook,
        },
    });
});
