import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const employeeRouter = Router();

// employeeRouter.get("/", employeeController.getAllEmployees);
// employeeRouter.get("/:employeeId", employeeController.getEmployeeById);
// employeeRouter.post("/", employeeController.createEmployee);
// employeeRouter.put("/:employeeId", employeeController.updateEmployee);
// employeeRouter.delete("/:employeeId", employeeController.deleteEmployee);

employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.getEmployeeById
);
employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.put(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.updateEmployee
);
employeeRouter.delete(
    "/:employeeId",
    ValidationMiddleware.validateEmployeeIds,
    employeeController.deleteEmployee
);

export { employeeRouter };
