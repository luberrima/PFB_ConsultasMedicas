import { genereErrorUtils } from '../utils/genereErrorUtils.js';

export const validateSchemaMiddleware = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(genereErrorUtils(400, 'ERROR_VALIDATE', 'Error de validación'));
    }

    next();
};