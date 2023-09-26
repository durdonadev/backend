import { v4 as uuid } from "uuid";
import fs from "fs";

class ExpensesService {
    readData() {
        const data = fs.promises.readFile("expenses.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.expenses;
        });
        return dataObj;
    }

    writeData(data) {
        return fs.promises.writeFile("expenses.json", JSON.stringify(data));
    }

    getAllExpenses() {
        return this.readData();
    }

    getExpenseById(expenseId) {
        const expenses = this.readData();

        const expense = expenses.then((expensesObj) => {
            return expensesObj[expenseId];
        });
        return expense;
    }

    createExpense(data) {
        const expenses = this.readData();

        const result = expenses.then((expensesObj) => {
            const id = uuid();
            const newExpense = { id, ...data };
            expensesObj[id] = newExpense;

            return this.writeData({ expenses: expensesObj }).then(
                () => newExpense
            );
        });
        return result;
    }

    updateExpenseById(expenseId, data) {
        const expenses = this.readData();
        return expenses.then((expensesObj) => {
            if (expensesObj.hasOwnProperty(expenseId)) {
                const updatedExpense = {
                    ...expensesObj[expenseId],
                    ...data
                };
                expensesObj[expenseId] = updatedExpense;
                return this.writeData({ expenses: expensesObj }).then(
                    () => updatedExpense
                );
            } else {
                return "Error";
            }
        });
    }

    deleteExpenseById(expenseId) {
        const expenses = this.readData();
        return expenses.then((expensesObj) => {
            if (expensesObj.hasOwnProperty(expenseId)) {
                delete expensesObj[expenseId];
                return this.writeData({ expenses: expensesObj }).then(() => {
                    return "An expense was deleted";
                });
            } else {
                return "Error";
            }
        });
    }
}

export const expensesService = new ExpensesService();
