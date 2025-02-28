import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newConsultTextSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    skillId: joi.number().required().messages(joiErrorMessages),
    description: joi.string().min(5).max(500).required().messages(joiErrorMessages),
    gravedad: joi.string().valid("Leve", "Normal", "Moderada", "Grave", "Urgente").required(),
    doctorId: joi.string().guid({ version: ['uuidv4'] }).optional(),

});