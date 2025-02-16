import joi from 'joi';
export const newUserSchema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
});
