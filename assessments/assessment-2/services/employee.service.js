import fs from "fs";
import { v4 as uuid } from "uuid";

// const employeesData = require("../data/employee.json");

class EmployeeService {
    readParseAll() {
        const data = fs.readFileSync("../data/employees.json", "utf8");
        return JSON.parse(data).employees;
    }

    updateAll(data) {
        fs.writeFileSync("../data/employees.json", JSON.stringify(data));
    }

    getAllEmployees() {
        return this.readParseAll(); // array
    }

    getEmployeeById(employeeId) {
        return this.readParseAll().find(
            (employee) => employee.employeeId === employeeId
        );
    }

    createEmployee(employee) {
        const employees = this.readParseAll();
        employee.id = uuid();
        employees.push(employee);
        this.writeEmployees(employees);
        return employee;
    }

    updateEmployee(employeeId, updatedEmployee) {
        const employees = this.readEmployees();
        for (const employee of employees) {
            if (employee[employeeId]) {
                employee[employeeId] = {
                    ...employee[employeeId],
                    ...updatedEmployee
                };
                return employee[employeeId];
            } else {
                return "Error";
            }
        }
        this.updateAll(employees);
    }

    deleteEmployee(employeeId) {
        const employees = this.readEmployees();
        const index = employees.findIndex(
            (employee) => employee.employeeId === employeeId
        );

        if (index !== -1) {
            const deletedEmployee = employees.splice(index, 1)[0];
            this.writeEmployees(employees);
            return deletedEmployee;
        } else {
            return null;
        }
    }
}

export const employeeService = new EmployeeService();
