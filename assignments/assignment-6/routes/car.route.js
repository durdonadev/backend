import { Router } from "express";

import { carController } from "../controllers/car.controller.js";
import { validationMiddleware } from "../../../lectures/book-app-api-express-services-middleware/middlewares/validation.middleware.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.post("/", carController.createCar);
carRouter.get(
    "/:carId",
    validationMiddleware.validateIds,
    carController.getCarById
);
carRouter.put(
    "/:carId",
    validationMiddleware.validateIds,
    carController.updateCar
);
carRouter.delete(
    "/:carId",
    validationMiddleware.validateIds,
    carController.deleteCar
);

export { carRouter };
