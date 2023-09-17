import { Router } from "express";

import { bookController } from "../controllers/book.controller.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.post("/", bookController.createABook);
bookRouter.get("/:bookId", bookController.getBookById);
bookRouter.put("/:bookId", bookController.updateBook);
bookRouter.delete("/:bookId", bookController.deleteBook);
bookRouter.get("/:bookId/reviews", bookController.getBookReviews);
bookRouter.post("/:bookId/reviews", bookController.createReview);
bookRouter.get("/:bookId/reviews/:reviewId", bookController.getReview);
bookRouter.delete("/:bookId/reviews/:reviewId", bookController.deleteReview);

export { bookRouter };
