import joi from 'joi';

export const voteDoctorSchema = joi.object({
    vote: joi.number().integer().min(1).max(5).required(),
});
