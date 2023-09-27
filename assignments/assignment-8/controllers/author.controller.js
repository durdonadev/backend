import { authorService } from "../services/author.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { AUTHOR_FIELDS } from "../const/allowedFields.js";

class AuthorController {
    async getAllAuthors(req, res) {
        try {
            const parsedDtata = await authorService.getAllAuthors();
            res.status(200).json({ data: parsedDtata });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async getAuthorById(req, res) {
        const authorId = req.params.authorId;
        try {
            const data = await authorService.getAuthorById(authorId);
            res.status(200).json({ author: data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async addAuthor(req, res) {
        try {
            const data = sanitizedObj(AUTHOR_FIELDS, req.body);
            const newAuthor = await authorService.addAuthor(data);
            res.status(201).json({ newAuthor: newAuthor });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async updateAuthor(req, res) {
        try {
            const authorId = req.params.authorId;
            const data = sanitizedObj(AUTHOR_FIELDS, req.body);
            const updatedAuthor = await authorService.updateAuthor(
                authorId,
                data
            );
            res.status(200).json({ data: updatedAuthor });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async deleteAuthor(req, res) {
        try {
            const authorId = req.params.authorId;
            await authorService.deleteAuthor(authorId);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export const authorController = new AuthorController();
