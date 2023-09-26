import { Router } from "express";
import { incomesController } from "../controllers/income.controller.js";
// import { validationMiddleware } from "../middlewares/middleware.js";

const incomesRouter = new Router();

incomesRouter.get("/", incomesController.getAllIncomes);
incomesRouter.get(
    "/:incomeId",

    incomesController.getIncomeById
);
export { incomesRouter };
