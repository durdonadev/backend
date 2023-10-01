import { Router } from "express";
import { postController } from "../controllers/post.controller.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

const postRouter = new Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get(
    "/:postId",
    validationMiddleware.validatePostId,
    postController.getPostById
);
postRouter.post("/", postController.addPost);
postRouter.patch(
    "/:postId",
    validationMiddleware.validatePostId,
    postController.updatePost
);
postRouter.delete(
    "/:postId",
    validationMiddleware.validatePostId,
    postController.deletePost
);

export { postRouter };
