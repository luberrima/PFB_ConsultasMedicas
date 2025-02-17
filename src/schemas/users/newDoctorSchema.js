import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';
export const newDoctorSchema = joi.object({
    username: joi.string().min(3).max(50).required().message(joiErrorMessages),
    email: joi.string().email().required().message(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required()
        .message(joiErrorMessages),
    collegeNumber: joi.string().required().message(joiErrorMessages),
    dateOfCollege: joi.date().required().message(joiErrorMessages),
    skillId: joi.number().integer().required().message(joiErrorMessages),
});
