import { cars } from "../data.js";
import { v4 as uuid } from "uuid";

class CarService {
    getAllCars() {
        return Object.values(cars);
    }

    getCarById(carId) {
        return cars[carId];
    }

    createCar(data) {
        const id = uuid();
        const car = {
            id,
            ...data
        };
        cars[id] = car;
        return car;
    }

    updateCar(carId, data) {
        const car = cars[carId];
        if (car) {
            cars[carId] = { ...cars[carId], ...data };
            return cars[carId];
        }
        return "Error";
    }
}

export const carService = new CarService();
