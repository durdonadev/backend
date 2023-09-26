import { Router } from "express";
import { incomesController } from "../controllers/income.controller.js";
import { validationMiddleware } from "../middlewares/middleware.js";

const incomesRouter = new Router();

incomesRouter.get("/", incomesController.getAllIncomes);
incomesRouter.get(
    "/:incomeId",
    validationMiddleware.validateIncomeId,
    incomesController.getIncomeById
);
incomesRouter.post("/", incomesController.createIncome);
incomesRouter.patch(
    "/:incomeId",
    validationMiddleware.validateIncomeId,
    incomesController.updateIncomeById
);
incomesRouter.delete(
    "/:incomeId",
    validationMiddleware.validateIncomeId,
    incomesController.deleteIncomeById
);

export { incomesRouter };
