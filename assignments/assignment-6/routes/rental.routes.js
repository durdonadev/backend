import { Router } from "express";

import { rentalController } from "../controllers/rental.controller.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.post(
    "/",
    validationMiddleware.validateCarIdsInBody,
    rentalController.createRental
);
rentalRouter.get(
    "/:rentalId",
    validationMiddleware.validateRentalIds,
    rentalController.getRentalById
);
rentalRouter.put(
    "/:rentalId",
    validationMiddleware.validateRentalIds,
    rentalController.updateRental
);
rentalRouter.delete(
    "/:rentalId",
    validationMiddleware.validateRentalIds,
    rentalController.deleteRental
);

export { rentalRouter };
