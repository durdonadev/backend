import { books } from "../data.js";
import { validate, v4 as uuid } from "uuid";

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhjbbhvbdsfjhgc";

class BookController {
    getAllBooks = (req, res) => {
        const genre = req.query.genre;
        let filteredBooks = Object.values(books);
        if (genre) {
            filteredBooks = filteredBooks.filter(
                (book) => book.genre === genre
            );
        }
        res.status(200).json({ data: filteredBooks });
    };

    createABook = (req, res) => {
        const data = req.body;
        const id = uuid();
        const book = {
            id,
            ...data,
            reviews: []
        };
        books[id] = book;
        res.status(201).json({ data: book });
    };

    getBookById = (req, res) => {
        const bookId = req.params.bookId;
        if (!validate(bookId) || !books[bookId]) {
            res.status(400).json({ message: "Not a valid book ID" });
            return;
        }
        console.log("hello");
        res.status(200).json({ data: books[bookId] });
    };

    updateBook = (req, res) => {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        books[bookId] = { ...books[bookId], ...updatedData };
        res.status(200).json({ data: books[bookId] });
    };

    deleteBook = (req, res) => {
        const bookId = req.params.bookId;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        delete books[bookId];
        res.status(204).send();
    };

    getBookReviews = (req, res) => {
        const bookId = req.params.bookId;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        res.status(200).json({ data: books[bookId].reviews });
    };

    createReview = (req, res) => {
        const bookId = req.params.bookId;
        const reviewData = req.body;
        const id = uuid();
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        const newReview = {
            id,
            ...reviewData
        };
        books[bookId].reviews.push(newReview);
        res.status(201).json({ data: newReview });
    };

    getReview = (req, res) => {
        const { bookId, reviewId } = req.params;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        const review = books[bookId].reviews.find((r) => r.id === reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ data: review });
    };

    deleteReview = (req, res) => {
        const { bookId, reviewId } = req.params;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        const reviewIndex = books[bookId].reviews.findIndex(
            (r) => r.id === reviewId
        );
        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Review not found" });
        }
        books[bookId].reviews.splice(reviewIndex, 1);
        res.status(204).send();
    };
}

export const bookController = new BookController();
