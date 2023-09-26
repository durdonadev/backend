import { postService } from "../services/post.service.js";
import { promises as fs } from "fs";

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
            const newPost = await postService.addPost(req.body);
            res.status(201).json({ data: newPost });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async updatePost(req, res) {
        try {
            const postId = req.params.postId;
            const data = req.body;
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
