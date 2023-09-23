export const sanitizeObj = (allowedField, obj) => {
    for (const field in obj) {
        if (allowedField.includes(field)) {
            sanitizeObj[field] = obj[field];
        }
    }
    return sanitizeObj;
};
