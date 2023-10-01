import { Router } from "express";
import { tagController } from "../controllers/tag.controller.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";

const tagRouter = new Router();

tagRouter.get("/", tagController.getAllTags);
tagRouter.get(
    "/:tagId",
    validationMiddleware.validateTagId,
    tagController.getTagById
);
tagRouter.post("/", tagController.addTag);
tagRouter.patch(
    "/:tagId",
    validationMiddleware.validateTagId,
    tagController.updateTag
);
tagRouter.delete(
    "/:tagId",
    validationMiddleware.validateTagId,
    tagController.deleteTag
);

export { tagRouter };
