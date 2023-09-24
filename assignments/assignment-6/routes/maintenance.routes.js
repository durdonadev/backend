import { Router } from "express";

import { maintenanceController } from "../controllers/maintenance.controller.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController.getAllMaintenances);
maintenanceRouter.post(
    "/",
    validationMiddleware.validateCarIdsInBody,
    maintenanceController.createMaintenance
);
maintenanceRouter.get(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceIds,
    maintenanceController.getMaintenanceById
);
maintenanceRouter.put(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceIds,
    maintenanceController.updateMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    validationMiddleware.validateMaintenanceIds,
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
