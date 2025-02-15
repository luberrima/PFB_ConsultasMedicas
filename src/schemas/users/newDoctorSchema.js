import joi from 'joi';
export const newDoctorSchema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required(),
    collegeNumber: joi.string().required(),
    dateOfCollege: joi.date().required(),
    skillId: joi.number().integer().required(),
});