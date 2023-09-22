import { Router } from "express";

import { bookController } from "../controllers/book.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.post("/", bookController.createABook);
bookRouter.get(
    "/:bookId",
    validationMiddleware.validateIds,
    bookController.getBookById
);
bookRouter.put(
    "/:bookId",
    validationMiddleware.validateIds,
    bookController.updateBook
);
bookRouter.delete(
    "/:bookId",
    validationMiddleware.validateIds,
    bookController.deleteBook
);
bookRouter.get(
    "/:bookId/reviews",
    validationMiddleware.validateIds,
    bookController.getBookReviews
);
bookRouter.post(
    "/:bookId/reviews",
    validationMiddleware.validateIds,
    bookController.createReview
);
bookRouter.get(
    "/:bookId/reviews/:reviewId",
    validationMiddleware.validateIds,
    bookController.getReview
);
bookRouter.delete(
    "/:bookId/reviews/:reviewId",
    validationMiddleware.validateIds,
    bookController.deleteReview
);

export { bookRouter };
