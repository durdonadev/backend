import { books } from "../data.js";
import { validate, v4 as uuid } from "uuid";

class BookService {
    getAllBooks(query) {
        const { genre } = query;
        let filteredBooks = Object.values(books);
        if (genre) {
            filteredBooks = filteredBooks.filter(
                (book) => book.genre === genre
            );
        }

        return filteredBooks;
    }

    createABook(data) {
        const id = uuid();
        const book = {
            id,
            ...data,
            reviews: []
        };
        books[id] = book;
        return book;
    }

    getBookById(bookId) {
        return books[bookId];
    }

    updateBook(bookId, data) {
        const book = books[bookId];
        if (book) {
            books[bookId] = { ...books[bookId], ...data };
            return books[bookId];
        }
        return "Error";
    }

    deleteBook(bookId) {
        if (books[bookId]) {
            delete books[bookId];
        }
        return "Error";
    }

    getBookReviews(bookId) {
        if (books[bookId]) {
            return books[bookId].reviews;
        }
        return "Error";
    }

    createReview(bookId, data) {
        if (books[bookId]) {
            const id = uuid();
            const newReview = {
                id,
                ...reviewData
            };
            books[bookId].reviews.push(newReview);
            return newReview;
        }

        return "Error";
    }

    getReview(bookId, reviewId) {
        const review = books[bookId].reviews.find((r) => r.id === reviewId);
        return review;
    }

    deleteReview(bookId, reviewId) {
        const book = books[bookId];
        if (!book) return "Book not found";

        const reviewIndex = book.reviews.findIndex((r) => r.id === reviewId);
        if (reviewIndex === -1) {
            return "Review Not Found";
        }
        book.reviews.splice(reviewIndex, 1);
    }
}

export const bookService = new BookService();
