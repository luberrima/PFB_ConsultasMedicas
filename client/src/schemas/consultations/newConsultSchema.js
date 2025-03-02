import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newConsultSchema = joi.object({

	title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    skillId: joi.number().required().messages(joiErrorMessages),
    description: joi.string().min(5).max(500).required().messages(joiErrorMessages),
    gravedad: joi.string().valid("Leve", "Normal", "Moderada", "Grave", "Urgente").required(),
    doctorId: joi.string().guid({ version: ['uuidv4'] }).optional(),
	img1: joi.object().messages(joiErrorMessages),
	img2: joi.object().messages(joiErrorMessages),
	img3: joi.object().messages(joiErrorMessages),
    img4: joi.object().messages(joiErrorMessages),






	/* title: joi.string().min(3).max(50).required().messages(joiErrorMessages),
	skill: joi.number().required().messages(joiErrorMessages),
    gravedad: joi.string().min(3).max(30).required().messages(joiErrorMessages),
	doctorId: joi.string().guid({ version: ['uuidv4'] }).optional(),
	description: joi
		.string()
		.min(3)
		.max(500)
		.required()
		.messages(joiErrorMessages),
	img1: joi.object().messages(joiErrorMessages),
	img2: joi.object().messages(joiErrorMessages),
	img3: joi.object().messages(joiErrorMessages),
    img4: joi.object().messages(joiErrorMessages), */
});