import { Router } from "express";

import { carController } from "../controllers/car.controller.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.post("/", carController.createCar);
carRouter.get("/:carId", carController.getCarById);
carRouter.put("/:carId", carController.updateCar);
carRouter.delete("/:carId", carController.deleteCar);

export { carRouter };
