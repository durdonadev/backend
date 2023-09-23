import { cars, maintenance } from "../data.js";
import { v4 as uuid, validate } from "uuid";

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhjbbhvbdsfjhgc";

class MaintenanceController {
    getAllMaintenances = (req, res) => {
        const { headers } = req;
        if (headers.authorization) {
            const apiKeyParts = headers.authorization.split(" ");

            if (apiKeyParts[0] !== "Bearer" || apiKeyParts[1] !== API_KEY) {
                res.status(401).json({
                    message: "Not Valid API key"
                });
                return;
            }
        } else {
            res.status(400).json({
                message: "API key is missing"
            });
            return;
        }

        res.status(200).json({
            data: maintenance
        });
    };

    getMaintenanceById = (req, res) => {
        const maintenanceId = req.params.maintenanceId;

        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }

        res.status(200).json({ data: maintenance[maintenanceId] });
    };

    // createMaintenance = (req, res) => {
    //     const { carId, oilChange } = req.body;
    //     if (!validate(carId) || !cars[carId]) {
    //         return res.status(400).json({ message: "Not a valid car ID" });
    //     }

    //     const id = uuid();
    //     const maintenance = {
    //         id,
    //         carId,
    //         oilChange
    //     };
    //     maintenance[id] = maintenance;
    //     res.status(201).json({ data: maintenance });
    // };

    createMaintenance = (req, res) => {
        const { carId, oilChange } = req.body;
        if (!validate(carId) || !cars[carId]) {
            return res.status(400).json({ message: "Not a valid car ID" });
        }

        const id = uuid();
        const maintenence = {
            id,
            carId,
            oilChange
        };
        maintenence[id] = maintenence;
        res.status(201).json({ data: maintenence });
    };

    updateMaintenance = (req, res) => {
        const maintenanceId = req.params.maintenanceId;
        const updatedData = req.body;

        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }

        maintenance[maintenanceId] = {
            ...maintenance[maintenanceId],
            ...updatedData
        };
        res.status(200).json({ data: maintenance[maintenanceId] });
    };

    deleteMaintenance = (req, res) => {
        const maintenanceId = req.params.maintenanceId;

        if (!validate(maintenanceId) || !maintenance[maintenanceId]) {
            return res
                .status(400)
                .json({ message: "Not a valid maintenance ID" });
        }
        delete maintenance[maintenanceId];
        res.status(204).send();
    };
}

export const maintenanceController = new MaintenanceController();
