import { validate } from "uuid";
import { postService } from "../services/post.service.js";
import { authorService } from "../services/author.service.js";

class ValidationMiddleware {
    validatePostId(req, res, next) {
        const posts = postService.readAndParseFile();
        return posts.then(() => {
            const { postId } = req.params;
            if (validate(postId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid Post ID" });
        });
    }

    validateAuthorId(req, res, next) {
        const authors = authorService.readAndParseFile();
        return authors.then(() => {
            const { authorId } = req.params;
            if (validate(authorId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid author ID" });
        });
    }
}

export const validationMiddleware = new ValidationMiddleware();
