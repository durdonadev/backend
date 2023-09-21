import { validate } from "uuid";

class ValidationMiddleware {
    validateIds = (req, res, next) => {
        const { params } = req;
        for (const id in params) {
            if (id.toLowerCase().endsWith("id")) {
                if (!validate(id)) {
                    res.status(400).json({ message: `Not a valid ${id}` });
                }
            }
        }

        next();
    };
}

export const validationMiddleware = new ValidationMiddleware();
