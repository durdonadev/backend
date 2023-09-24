import { rentals } from "../data.js";
import { v4 as uuid } from "uuid";

class RentalService {
    getAllRentals() {
        return rentals;
    }

    getRentalById(rentalId) {
        return rentals[rentalId];
    }

    createRental(data) {
        const id = uuid();
        const rental = {
            id,
            ...data
        };
        rentals[id] = rental;
        return rental;
    }

    updateRental(rentalId, data) {
        const rental = rentals[rentalId];
        if (rental) {
            rentals[rentalId] = { ...rentals[rentalId], ...data };
            return rentals[rentalId];
        }
        return "Error";
    }

    deleteRental(rentalId) {
        if (rentals[rentalId]) {
            delete rentals[rentalId];
            return;
        }
        return "Error";
    }
}

export const rentalService = new RentalService();
