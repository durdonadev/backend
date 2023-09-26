import { v4 as uuid } from "uuid";
import fs from "fs";

class IncomesService {
    readData() {
        const data = fs.promises.readFile("incomes.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.incomes;
        });
        return dataObj;
    }

    writeData(data) {
        return fs.promises.writeFile("incomes.json", JSON.stringify(data));
    }

    getAllIncomes() {
        return this.readData();
    }

    getIncomeById(incomeId) {
        const incomes = this.readData();
        const result = incomes.then((data) => {
            return data[incomeId];
        });
        return result;
    }

    createIncome(data) {
        const incomes = this.readData();
        const result = incomes.then((incomesObj) => {
            const id = uuid();
            const newIncome = {
                id,
                ...data
            };
            incomesObj[id] = newIncome;

            return this.writeData({ incomes: incomesObj }).then(
                () => newIncome
            );
        });
        return result;
    }

    updateIncomeById(incomeId, data) {
        const incomes = this.readData();
        return incomes.then((incomesObj) => {
            if (incomesObj[incomeId]) {
                const updatedIncome = {
                    ...incomesObj[incomeId],
                    ...data
                };
                incomesObj[incomeId] = updatedIncome;
                return this.writeData({ incomes: incomesObj }).then(
                    () => updatedIncome
                );
            } else {
                return "Error";
            }
        });
    }

    deleteIncomeById(incomeId) {
        const incomes = this.readData();

        return incomes.then((incomesObj) => {
            if (incomesObj[incomeId]) {
                delete incomesObj[incomeId];
                return this.writeData({ incomes: incomesObj });
            } else {
                return "Income with this ID is not found";
            }
        });
    }
}

export const incomesService = new IncomesService();
