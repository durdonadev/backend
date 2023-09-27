import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class PostService {
    async readAndParseFile() {
        try {
            const data = await fs.readFile("./data/posts.json", "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.posts;
        } catch (err) {
            throw err;
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFile("./data/posts.json", JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }

    async getAllPosts() {
        return await this.readAndParseFile();
    }

    async getPostById(postId) {
        const posts = await this.readAndParseFile();
        return posts[postId];
    }

    async addPost(data) {
        const postsObj = await this.readAndParseFile();
        const id = uuid();

        const newPost = {
            id,
            ...data
        };

        postsObj[id] = newPost;

        await this.writeFile({ posts: postsObj });
        return newPost;
    }

    async updatePost(postId, data) {
        const posts = await this.readAndParseFile();
        if (posts[postId]) {
            const updatedPost = { ...posts[postId], ...data };

            posts[postId] = updatedPost;
            await this.writeFile({ posts });
            return updatedPost;
        } else {
            return "Error";
        }
    }

    async deletePost(postId) {
        const posts = await this.readAndParseFile();

        if (posts[postId]) {
            delete posts[postId];
            return await this.writeFile({ posts });
        } else {
            return "Error";
        }
    }
}

export const postService = new PostService();
