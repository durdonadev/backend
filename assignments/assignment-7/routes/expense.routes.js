import { Router } from "express";
import { expensesController } from "../controllers/expense.controller.js";
import { validationMiddleware } from "../middlewares/middleware.js";

const expensesRouter = new Router();

expensesRouter.get("/", expensesController.getAllExpenses);
expensesRouter.get(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.getExpenseById
);
expensesRouter.post("/", expensesController.createExpense);
expensesRouter.patch(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.updateExpenseById
);
expensesRouter.delete(
    "/:expenseId",
    validationMiddleware.validateExpenseId,
    expensesController.deleteExpenseById
);

export { expensesRouter };
