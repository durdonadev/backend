import { validate } from "uuid";
import { postService } from "../services/post.service.js";

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
}

export const validationMiddleware = new ValidationMiddleware();
