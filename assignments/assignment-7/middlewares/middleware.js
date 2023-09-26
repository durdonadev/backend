import { incomesService } from "../services/income.service.js";
import { validate } from "uuid";
import { expensesService } from "../services/expense.service.js";

class ValidationMiddleware {
    validateIncomeId(req, res, next) {
        const incomes = incomesService.readData();
        return incomes.then(() => {
            const { incomeId } = req.params;
            if (validate(incomeId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid income ID" });
        });
    }

    validateExpenseId(req, res, next) {
        const expense = expensesService.readData();
        const result = expense.then(() => {
            const { expenseId } = req.params;
            if (validate(expenseId)) {
                next();
                return;
            }
            res.status(400).json({ message: "Not a valid expense ID" });
        });
        return result;
    }
}

export const validationMiddleware = new ValidationMiddleware();
