import express from "express";
import { books } from "./data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 4000;

// Get all books (with optional genre filter)
app.get("/books", (req, res) => {
    const genre = req.query.genre;
    let filteredBooks = Object.values(books);
    if (genre) {
        filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }
    res.status(200).json({ data: filteredBooks });
});

// Create a new book
app.post("/books", (req, res) => {
    const data = req.body;
    const id = uuid();
    const book = {
        id,
        ...data,
        reviews: []
    };
    books[id] = book;
    res.status(201).json({ data: book });
});

// Get a single book by ID
app.get("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    if (!validate(bookId) || !books[bookId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    res.status(200).json({ data: books[bookId] });
});

// Update a single book by ID
app.put("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const updatedData = req.body;
    if (!validate(bookId) || !books[bookId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    books[bookId] = { ...books[bookId], ...updatedData };
    res.status(200).json({ data: books[bookId] });
});

// Delete a single book by ID
app.delete("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    if (!validate(bookId) || !books[bookId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    delete books[bookId];
    res.status(204).send();
});

// Get all reviews of a book
app.get("/books/:bookId/reviews", (req, res) => {
    const bookId = req.params.bookId;
    if (!validate(bookId) || !books[bookId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    res.status(200).json({ data: books[bookId].reviews });
});

// Create a new review for a book
app.post("/books/:bookId/reviews", (req, res) => {
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
});

// Get a single review of a book
app.get("/books/:bookId/reviews/:reviewId", (req, res) => {
    const { bookId, reviewId } = req.params;
    if (!validate(bookId) || !books[bookId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    const review = books[bookId].reviews.find((r) => r.id === reviewId);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ data: review });
});

// Delete a single review of a book
app.delete("/books/:bookId/reviews/:reviewId", (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
