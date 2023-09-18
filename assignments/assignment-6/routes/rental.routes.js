import { Router } from "express";

import { rentalController } from "../controllers/rental.controller.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.post("/", rentalController.createRental);
rentalRouter.get("/:rentalId", rentalController.getRentalById);
rentalRouter.put("/:rentalId", rentalController.updateRental);
rentalRouter.delete("/:rentalId", rentalController.deleteRental);

export { rentalRouter };
