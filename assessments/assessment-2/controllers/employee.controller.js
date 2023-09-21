import { employeeService } from "../services/employee.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { EMPLOYEE_FIELDS } from "../const/allowedFields.js";

class EmployeeController {
    getAllEmployees = (req, res) => {
        const employees = employeeService.getAllEmployees();
        res.status(200).json({ data: employees });
    };

    getEmployeeById = (req, res) => {
        const employeeId = req.params.employeeId;
        const employee = employeeService.getEmployeeById(employeeId);
        if (employee) {
            res.status(200).json({ data: employee });
        } else {
            res.status(404).json({ error: "Employee not found" });
        }
    };

    createEmployee = (req, res) => {
        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);
        const newEmployee = employeeService.createEmployee(data);
        res.status(201).json(newEmployee);
    };

    updateEmployee = (req, res) => {
        const employeeId = req.params.employeeId;

        const data = sanitizedObj(EMPLOYEE_FIELDS, req.body);
        const employee = employeeService.updateEmployee(employeeId, data);

        if (employee === "Error") {
            res.status(404).json({
                message: "Employee with provided ID does not exist"
            });
            return;
        }
        res.status(200).json({ data: employee });
    };

    deleteEmployee = (req, res) => {
        const employeeId = req.params.employeeId;
        const deletedEmployee = employeeService.deleteEmployee(employeeId);
        if (deletedEmployee) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Employee not found" });
        }
    };
}

export const employeeController = new EmployeeController();
