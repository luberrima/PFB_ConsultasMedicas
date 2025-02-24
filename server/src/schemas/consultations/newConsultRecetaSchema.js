import joi from 'joi';
import { imgSchema } from '../imgSchema.js';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newConsultRecetaSchema = joi.object({
    img1: joi.object({
        name: joi.string().required().messages({
            'any.required': 'La foto 1 es obligatoria',
            'string.base': 'El nombre de la foto 1 debe ser una cadena',
        }),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages({
                'any.only': 'La foto 1 debe ser jpeg o png',
            }),
        size: joi
            .number()
            .max(5 * 1024 * 1024)
            .required()
            .messages({
                'any.required': 'El tamaño de la foto img1 es obligatorio',
                'number.max': 'La foto 1 no debe exceder los 5 MB',
            }),
    }),
    img2: joi.object({
        name: joi.string().required().messages({
            'any.required': 'La foto img2 es obligatoria',
            'string.base': 'El nombre de la foto img2 debe ser una cadena',
        }),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages({
                'any.only': 'La foto img2 debe ser jpeg o png',
            }),
        size: joi.number().max(5000000).required().messages({
            'any.required': 'El tamaño de la foto img2 es obligatorio',
            'number.max': 'La foto img2 no debe exceder los 5 MB',
        }),
    }),
    img3: joi.object({
        name: joi.string().required().messages({
            'any.required': 'La foto img3 es obligatoria',
            'string.base': 'El nombre de la foto img3 debe ser una cadena',
        }),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages({
                'any.only': 'La foto img3 debe ser jpeg o png',
            }),
        size: joi.number().max(5000000).required().messages({
            'any.required': 'El tamaño de la foto img3 es obligatorio',
            'number.max': 'La foto img3 no debe exceder los 5 MB',
        }),
    }),
});