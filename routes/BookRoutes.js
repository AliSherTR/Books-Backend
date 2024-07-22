const express = require("express");
const booksController = require("../controllers/BooksController");

const router = express.Router();

router
    .route("/books")
    .get(booksController.getBooks)
    .post(booksController.addBook);

router
    .route("/books/:id")
    .get(booksController.getBook)
    .delete(booksController.deleteBook)
    .patch(booksController.updateBook);

module.exports = router;
