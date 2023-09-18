import { cars, rentals } from "../data.js";
import { v4 as uuid, validate } from "uuid";

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhjbbhvbdsfjhgc";

class RentalController {
    getAllRentals = (req, res) => {
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
            data: rentals
        });
    };

    getRentalById = (req, res) => {
        const rentalId = req.params.rentalId;

        if (!validate(rentalId) || !rentals[rentalId]) {
            return res.status(400).json({ message: "Not a valid rental ID" });
        }

        res.status(200).json({ data: rentals[rentalId] });
    };

    createRental = (req, res) => {
        const { carId, startDate, endDate } = req.body;
        if (!validate(carId) || !cars[carId]) {
            return res.status(400).json({ message: "Not a valid car ID" });
        }

        const id = uuid();
        const rental = {
            id,
            carId,
            startDate,
            endDate
        };
        rentals[id] = rental;
        res.status(201).json({ data: rental });
    };

    updateRental = (req, res) => {
        const rentalId = req.params.rentalId;
        const updatedData = req.body;

        if (!validate(rentalId) || !rentals[rentalId]) {
            return res.status(400).json({ message: "Not a valid rental ID" });
        }

        rentals[rentalId] = { ...rentals[rentalId], ...updatedData };
        res.status(200).json({ data: rentals[rentalId] });
    };

    deleteRental = (req, res) => {
        const rentalId = req.params.rentalId;

        if (!validate(rentalId) || !rentals[rentalId]) {
            return res.status(400).json({ message: "Not a valid rental ID" });
        }
        delete rentals[rentalId];
        res.status(204).send();
    };
}

export const rentalController = new RentalController();
