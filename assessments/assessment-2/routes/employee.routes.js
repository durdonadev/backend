import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

const employeeRouter = Router();

// employeeRouter.get("/", employeeController.getAllEmployees);
// employeeRouter.get("/:employeeId", employeeController.getEmployeeById);
// employeeRouter.post("/", employeeController.createEmployee);
// employeeRouter.put("/:employeeId", employeeController.updateEmployee);
// employeeRouter.delete("/:employeeId", employeeController.deleteEmployee);

employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get(
    "/:employeeId",
    validationMiddleware.validateEmployeeIds,
    employeeController.getEmployeeById
);
employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.put(
    "/:employeeId",
    validationMiddleware.validateEmployeeIds,
    employeeController.updateEmployee
);
employeeRouter.delete(
    "/:employeeId",
    validationMiddleware.validateEmployeeIds,
    employeeController.deleteEmployee
);

export { employeeRouter };
