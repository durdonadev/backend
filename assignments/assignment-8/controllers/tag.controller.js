import { tagService } from "../services/tag.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { TAG_FIELDS } from "../const/allowedFields.js";

class TagController {
    async getAllTags(req, res) {
        try {
            const parsedDtata = await tagService.getAllTags();
            res.status(200).json({ data: parsedDtata });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async getTagById(req, res) {
        const tagId = req.params.tagId;
        try {
            const data = await tagService.getTagById(tagId);
            res.status(200).json({ tag: data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async addTag(req, res) {
        try {
            const data = sanitizedObj(TAG_FIELDS, req.body);
            const newTag = await tagService.addTag(data);
            res.status(201).json({ newTag: newTag });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async updateTag(req, res) {
        try {
            const tagId = req.params.tagId;
            const data = sanitizedObj(TAG_FIELDS, req.body);
            const updatedTag = await tagService.updateTag(tagId, data);
            res.status(200).json({ data: updatedTag });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async deleteTag(req, res) {
        try {
            const tagId = req.params.tagId;
            await tagService.deleteTag(tagId);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export const tagController = new TagController();
