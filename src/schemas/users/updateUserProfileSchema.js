import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
    username: Joi.string().min(3).max(50).optional(),
    nombre: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().max(500).optional(),
    collegeNumber: Joi.string().optional(),
    dateOfCollege: Joi.date().optional(),
    skillId: Joi.number().integer().optional(),
});
