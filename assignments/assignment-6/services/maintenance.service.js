import { maintenance } from "../data.js";
import { v4 as uuid } from "uuid";

class MaintenanceService {
    getAllMaintenances() {
        return maintenance;
    }

    getMaintenanceById(maintenanceId) {
        return maintenance[maintenanceId];
    }

    createMaintenance(data) {
        const id = uuid();

        const maintenance = {
            id,
            ...data
        };
        maintenance[id] = maintenance;
        return maintenance;
    }

    updateMaintenance(maintenanceId, data) {
        const givenMaintenance = maintenance[maintenanceId];
        if (givenMaintenance) {
            maintenance[maintenanceId] = {
                ...maintenance[maintenanceId],
                ...data
            };
            return maintenance[maintenanceId];
        }
        return "Error";
    }

    deleteMaintenance(maintenanceId) {
        if (maintenance[maintenanceId]) {
            delete maintenance[maintenanceId];
            return;
        }
        return "Error";
    }
}

export const maintenanceService = new MaintenanceService();
