import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';
export const newDoctorSchema = joi.object({
    username: joi.string().min(3).max(50).required().messages(joiErrorMessages),
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    collegeNumber: joi.string().required().messages(joiErrorMessages),
    dateOfCollege: joi.date().required().messages(joiErrorMessages),
    skillId: joi.number().integer().required().messages(joiErrorMessages),
});
