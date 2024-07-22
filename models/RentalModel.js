const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: [true, "Rental must belong to a book"],
    },
    bookName: {
        type: String,
        required: [true, "Rental must include the book name"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Rental must belong to a user"],
    },
    userName: {
        type: String,
        required: [true, "Rental must include the user name"],
    },
    userEmail: {
        type: String,
        required: [true, "Rental must include the user email"],
    },
    rentedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
