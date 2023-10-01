import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class TagService {
    async readAndParseFile() {
        try {
            const data = await fs.readFile("./data/tags.json", "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.tags;
        } catch (err) {
            throw err;
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFile("./data/tags.json", JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }

    async getAllTags() {
        return await this.readAndParseFile();
    }

    async getTagById(tagId) {
        const tags = await this.readAndParseFile();
        return tags[tagId];
    }

    async addTag(data) {
        const tagsObj = await this.readAndParseFile();
        const id = uuid();

        const newTag = {
            id,
            ...data
        };

        tagsObj[id] = newTag;

        await this.writeFile({ tags: tagsObj });
        return newTag;
    }

    async updateTag(tagId, data) {
        const tags = await this.readAndParseFile();
        if (tags[tagId]) {
            const updatedTag = { ...tags[tagId], ...data };

            tags[tagId] = updatedTag;
            await this.writeFile({ tags });
            return updatedTag;
        } else {
            return "Error";
        }
    }

    async deleteTag(tagId) {
        const tags = await this.readAndParseFile();

        if (tags[tagId]) {
            delete tags[tagId];
            return await this.writeFile({ tags });
        } else {
            return "Error";
        }
    }
}

export const tagService = new TagService();
