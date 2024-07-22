const express = require("express");
const booksController = require("../controllers/BooksController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
    .route("/books")
    .get(protect, booksController.getBooks)
    .post(protect, booksController.addBook);

router
    .route("/books/:id")
    .get(protect, booksController.getBook)
    .delete(protect, booksController.deleteBook)
    .patch(protect, booksController.updateBook);

module.exports = router;
