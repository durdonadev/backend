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

    createIncome(req, res) {
        return incomesService
            .createIncome(req.body)
            .then((newIncome) => {
                res.status(201).json({ data: newIncome });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            });
    }

    updateIncomeById(req, res) {
        const { incomeId } = req.params;

        return incomesService
            .updateIncomeById(incomeId, req.body)
            .then((updatedIncome) => {
                res.status(200).json({ data: updatedIncome });
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    deleteIncomeById(req, res) {
        const { incomeId } = req.params;

        return incomesService
            .deleteIncomeById(incomeId)
            .then(() => {
                res.status(204).send();
            })
            .catch((err) =>
                res.status(500).json({
                    message: err
                })
            );
    }
}

export const incomesController = new IncomesController();
