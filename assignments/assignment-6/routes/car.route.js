import { Router } from "express";

import { carController } from "../controllers/car.controller.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.post("/", carController.createCar);
carRouter.get(
    "/:carId",
    validationMiddleware.validateCarIds,
    carController.getCarById
);
carRouter.put(
    "/:carId",
    validationMiddleware.validateCarIds,
    carController.updateCar
);
carRouter.delete(
    "/:carId",
    validationMiddleware.validateCarIds,
    carController.deleteCar
);

export { carRouter };
