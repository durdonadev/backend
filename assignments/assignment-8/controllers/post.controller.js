import { postService } from "../services/post.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { POST_FIELDS } from "../const/allowedFields.js";

class PostController {
    async getAllPosts(req, res) {
        try {
            const parsedDtata = await postService.getAllPosts();
            res.status(200).json({ data: parsedDtata });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async getPostById(req, res) {
        const postId = req.params.postId;
        try {
            const data = await postService.getPostById(postId);
            res.status(200).json({ post: data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async addPost(req, res) {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const newPost = await postService.addPost(data);
            res.status(201).json({ newPost: newPost });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async updatePost(req, res) {
        try {
            const postId = req.params.postId;
            const data = sanitizedObj(POST_FIELDS, req.body);
            const updatedPost = await postService.updatePost(postId, data);
            res.status(200).json({ data: updatedPost });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.postId;
            await postService.deletePost(postId);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export const postController = new PostController();
