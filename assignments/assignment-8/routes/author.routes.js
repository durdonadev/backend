import { Router } from "express";
import { authorController } from "../controllers/author.controller.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

const authorRouter = new Router();

authorRouter.get("/", authorController.getAllAuthors);
authorRouter.get(
    "/:authorId",
    validationMiddleware.validateAuthorId,
    authorController.getAuthorById
);
authorRouter.post("/", authorController.addAuthor);
authorRouter.patch(
    "/:authorId",
    validationMiddleware.validateAuthorId,
    authorController.updateAuthor
);
authorRouter.delete(
    "/:authorId",
    validationMiddleware.validateAuthorId,
    authorController.deleteAuthor
);

export { authorRouter };
