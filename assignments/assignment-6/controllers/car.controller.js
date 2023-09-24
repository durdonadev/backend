import { carService } from "../services/car.service.js";
import { sanitizeObj } from "../utils/sanitizeObj.js";
import { CAR_FIELDS } from "../const/allowedFields.js";

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhjbbhvbdsfjhgc";

class CarController {
    getAllCars = (req, res) => {
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

        const cars = carService.getAllCars();
        res.status(200).json({
            data: cars
        });
    };

    getCarById = (req, res) => {
        const car = carService.getCarById(req.params.carId);
        res.status(200).json({ data: car });
    };

    createCar = (req, res) => {
        const data = sanitizeObj(CAR_FIELDS, req.body);
        const car = carService.createCar(data);
        res.status(201).json({ data: car });
    };

    updateCar = (req, res) => {
        const sanitizedData = sanitizeObj(CAR_FIELDS, req.body);

        const updatedCar = carService.updateCar(
            req.params.carId,
            sanitizedData
        );

        if (updatedCar === "Error") {
            res.status(404).json({
                message: "Car does not exist"
            });
            return;
        }
        res.status(200).json({ data: updatedCar });
    };

    deleteCar = (req, res) => {
        const result = carService.deleteCar(req.params.carId);
        if (result === "Error") {
            res.status(404).json({ message: "Car does not exist" });
            return;
        }
        res.status(204).send();
    };
}

export const carController = new CarController();
