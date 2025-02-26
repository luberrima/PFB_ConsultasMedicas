export const validateSchemaUtil = (schema, data) => {
    return schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
};
