import { rentalService } from "../services/rental.service.js";
import { sanitizeObj } from "../utils/sanitizeObj.js";
import { RENTAL_FIELDS } from "../const/allowedFields.js";

class RentalController {
    getAllRentals = (req, res) => {
        const rentals = rentalService.getAllRentals();
        res.status(200).json({
            data: rentals
        });
    };

    getRentalById = (req, res) => {
        const rental = rentalService.getRentalById(req.params.rentalId);
        res.status(200).json({ data: rental });
    };

    createRental = (req, res) => {
        const sanitizedData = sanitizeObj(RENTAL_FIELDS, req.body);
        const rental = rentalService.createRental(sanitizedData);
        res.status(201).json({ data: rental });
    };

    updateRental = (req, res) => {
        const sanitizedData = sanitizeObj(RENTAL_FIELDS, req.body);
        const updatedRental = rentalService.updateRental(
            req.params.rentalId,
            sanitizedData
        );

        if (updatedRental === "Error") {
            res.status(404).json({ message: "Rental does not exist" });
        }
        res.status(200).json({ data: updatedRental });
    };

    deleteRental = (req, res) => {
        const result = rentalService.deleteRental(req.params.rentalId);
        if (result === "Error") {
            res.status(404).json({ message: "Rental does not exist" });
        }
        res.status(204).send();
    };
}

export const rentalController = new RentalController();
