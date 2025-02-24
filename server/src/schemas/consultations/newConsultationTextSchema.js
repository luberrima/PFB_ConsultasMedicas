import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newConsultTextSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    userId: joi.string().min(5).max(30).required().messages(joiErrorMessages),
    skillId: joi.string().min(5).max(30).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(5)
        .max(500)
        .required()
        .messages(joiErrorMessages),
});