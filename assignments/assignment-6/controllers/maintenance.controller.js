import { maintenanceService } from "../services/maintenance.service.js";
import { sanitizeObj } from "../utils/sanitizeObj.js";
import { MAINTENANCE_FIELDS } from "../const/allowedFields.js";

class MaintenanceController {
    getAllMaintenances = (req, res) => {
        const maintenance = maintenanceService.getAllMaintenances();
        res.status(200).json({
            data: maintenance
        });
    };

    getMaintenanceById = (req, res) => {
        const maintenance = maintenanceService.getMaintenanceById(
            req.params.maintenanceId
        );
        res.status(200).json({ data: maintenance });
    };

    createMaintenance = (req, res) => {
        const data = sanitizeObj(MAINTENANCE_FIELDS, req.body);

        const maintenance = maintenanceService.createMaintenance(data);

        res.status(201).json({ data: maintenance });
    };

    updateMaintenance = (req, res) => {
        const sanitizesData = sanitizeObj(MAINTENANCE_FIELDS, req.body);
        const updatedMaintenance = maintenanceService.updateMaintenance(
            req.params.maintenanceId,
            sanitizesData
        );

        if (updatedMaintenance === "Error") {
            res.status(404).json({ message: "Maintenance does not exist" });
        }
        res.status(200).json({ data: updatedMaintenance });
    };

    deleteMaintenance = (req, res) => {
        const result = maintenanceService.deleteMaintenance(
            req.params.maintenanceId
        );
        if (result === "Error") {
            res.status(404).json({ message: "Maintenance does not exist" });
        }
        res.status(204).send();
    };
}

export const maintenanceController = new MaintenanceController();
