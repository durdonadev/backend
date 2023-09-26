import { v4 as uuid } from "uuid";
import fs from "fs";

class IncomesService {
    readFile() {
        const data = fs.promises.readFile("incomes.json", "utf-8");
        const dataObj = data.then((data) => {
            const parsedObj = JSON.parse(data);
            return parsedObj.incomes;
        });
        return dataObj;
    }
    getAllIncomes() {
        return this.readFile();
    }

    getIncomeById(incomeId) {
        const incomes = this.readFile();
        const result = incomes.then((data) => {
            return data[incomeId];
        });
        return result;
    }
}

export const incomesService = new IncomesService();
