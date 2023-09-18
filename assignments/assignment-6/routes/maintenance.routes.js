import { Router } from "express";

import { maintenanceController } from "../controllers/maintenance.controller.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController.getAllMaintenances);
maintenanceRouter.post("/", maintenanceController.createMaintenance);
maintenanceRouter.get(
    "/:maintenanceId",
    maintenanceController.getMaintenanceById
);
maintenanceRouter.put(
    "/:maintenanceId",
    maintenanceController.updateMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
