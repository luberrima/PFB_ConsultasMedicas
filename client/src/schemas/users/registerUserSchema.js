import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';
export const newUserSchema = joi.object({
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
});
