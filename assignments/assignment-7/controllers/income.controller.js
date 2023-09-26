import { incomesService } from "../services/income.service.js";
import fs from "fs";

class IncomesController {
    getAllIncomes(req, res) {
        incomesService
            .getAllIncomes()
            .then((parsedData) => {
                res.status(200).json({ incomes: parsedData });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }
    getIncomeById(req, res) {
        const incomeId = req.params.incomeId;
        const income = incomesService
            .getIncomeById(incomeId)
            .then((data) => {
                res.status(200).json({ income: data });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
        return income;
    }
}

export const incomesController = new IncomesController();
