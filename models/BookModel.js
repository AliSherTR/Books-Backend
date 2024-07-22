const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A book must have a name"],
    },
    authorName: {
        type: String,
        required: [true, "A book must have an author"],
    },
    ISBNNumber: {
        type: String,
        required: [true, "A book must have an ISBN Number"],
    },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
