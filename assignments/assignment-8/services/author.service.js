import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class AuthorService {
    async readAndParseFile() {
        try {
            const data = await fs.readFile("./data/authors.json", "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.authors;
        } catch (err) {
            throw err;
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFile("./data/authors.json", JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }

    async getAllAuthors() {
        return await this.readAndParseFile();
    }

    async getAuthorById(authorId) {
        const authors = await this.readAndParseFile();
        return authors[authorId];
    }

    async addAuthor(data) {
        const authorsObj = await this.readAndParseFile();
        const id = uuid();

        const newAuthor = {
            id,
            ...data
        };

        authorsObj[id] = newAuthor;

        await this.writeFile({ authors: authorsObj });
        return newAuthor;
    }

    async updateAuthor(authorId, data) {
        const authors = await this.readAndParseFile();
        if (authors[authorId]) {
            const updatedAuthor = { ...authors[authorId], ...data };

            authors[authorId] = updatedAuthor;
            await this.writeFile({ authors });
            return updatedAuthor;
        } else {
            return "Error";
        }
    }

    async deleteAuthor(authorId) {
        const authors = await this.readAndParseFile();

        if (authors[authorId]) {
            delete authors[authorId];
            return await this.writeFile({ authors });
        } else {
            return "Error";
        }
    }
}

export const authorService = new AuthorService();
