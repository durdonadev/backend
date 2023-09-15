import express from "express";
import { v4 as uuid } from "uuid";
import { books } from "./data.js";
import { validate } from "uuid";

const app = express();

app.use(express.json());
const PORT = 4040;

app.get("/books", (req, res) => {
    const genre = req.query.genre;

    let filteredBooks = books;
    if (genre) {
        filteredBooks = {};
        for (const bookId in books) {
            const book = books[bookId];
            if (book.genre === genre) {
                filteredBooks[bookId] = book;
            }
        }
    }
    res.status(200).json({
        data: filteredBooks
    });
});

app.get("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    if (!validate(bookId)) {
        res.status(400).json({
            message: "Not Valid id"
        });
    }
    res.status(200).json({
        data: books[bookId]
    });
});

app.get("/books/:bookId/reviews", (req, res) => {
    const bookId = req.params.bookId;
    if (!validate(bookId)) {
        res.status(400).json({
            message: "Not Valid id"
        });
    }
    res.status(200).json({
        data: books[bookId].reviews
    });
});

app.post("/books", (req, res) => {
    const data = req.body;
    const id = uuid();
    const book = { ...data, id };
    books[id] = { ...book };

    res.status(200).json({
        data: book
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
