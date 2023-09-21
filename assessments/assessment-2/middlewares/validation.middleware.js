import { validate } from "uuid";

class ValidationMiddleware {
    validateEmployeeIds = (req, res, next) => {
        const { employeeId } = req.params;

        if (validate(employeeId)) {
            next();
            return;
        }
        res.status(400).json({ message: "Not a valid employee ID" });
    };
}

export const validationMiddleware = new ValidationMiddleware();
