export const sanitizedObj = (allowedFields, obj) => {
    const sanitizedData = {};

    for (const field in obj) {
        if (allowedFields.includes(field)) {
            sanitizedData[field] = obj[field];
        }
    }
    return sanitizedData;
};
