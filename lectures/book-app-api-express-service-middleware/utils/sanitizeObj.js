export const sanitizeObj = (allowedField, obj) => {
    for (const field in obj) {
        if (allowedField.includes(field)) {
            sanitizedData[field] = obj[field];
        }
    }
    return sanitizedData;
};
