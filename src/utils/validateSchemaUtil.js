import { genereErrorUtils } from './genereErrorUtils.js';

export const validateSchemaUtils = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        throw genereErrorUtils(400, 'VALIDATION_ERROR', error.message);
    }
};
