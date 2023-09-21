import { bookService } from "../services/book.service.js";
import { sanitizeObj } from "../utils/sanitizeObj.js";
import { BOOK_FIELDS, REVIEW_FIELDS } from "../const/allowedFields.js";

class BookController {
    getAllBooks = (req, res) => {
        const books = bookService.getAllBooks(req.query);
        res.status(200).json({ data: books });
    };

    createABook = (req, res) => {
        const data = sanitizeObj(BOOK_FIELDS, req.body);
        const book = bookService.createABook(data);
        res.status(201).json({ data: book });
    };

    getBookById = (req, res) => {
        const book = bookService.getBookById(req.params.bookId);
        res.status(200).json({ data: book });
    };

    updateBook = (req, res) => {
        const sanitizedData = sanitizeObj(BOOK_FIELDS, req.body);

        const result = bookService.updateBook(req.params.bookId, sanitizedData);

        if (result === "Error") {
            res.status(404).json({
                message: "Book does not exist"
            });
            return;
        }
        res.status(200).json({ data: result });
    };

    deleteBook = (req, res) => {
        const result = bookService.deleteBook(req.params.bookId);
        if (result === "Error") {
            res.status(404).json({
                message: "Book does not exist"
            });
            return;
        }
        res.status(204).send();
    };

    getBookReviews = (req, res) => {
        const result = bookService.getBookReviews(req.params.bookId);
        if (result === "Error") {
            res.status(404).json({
                message: "Book does not exist"
            });
            return;
        }
        res.status(200).json({ data: result });
    };

    createReview = (req, res) => {
        const sanitizedData = sanitizeObj(REVIEW_FIELDS, req.body);
        const result = bookService.createReview(
            req.params.bookId,
            sanitizedData
        );
        if (result === "Error") {
            res.status(404).json({
                message: "Book does not exist"
            });
            return;
        }

        res.status(201).json({ data: result });
    };

    getReview = (req, res) => {
        const { bookId, reviewId } = req.params;
        const result = bookService.getReview(bookId, reviewId);

        res.status(200).json({ data: result });
    };
    deleteReview = (req, res) => {
        const { bookId, reviewId } = req.params;
        const result = bookService.deleteReview(bookId, reviewId);
        if (result) {
            res.status(404).json({
                message: result
            });
            return;
        }
        res.status(204).send();
    };
}

export const bookController = new BookController();
