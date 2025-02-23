import joi from "joi";

const updateConsultationSchema = joi.object({
    title: joi.string().min(5).max(100).optional(),
    description: joi.string().min(10).optional(),
    status: Joi.string().valid("abierta", "cerrada").optional(),
});

export default updateConsultationSchema;
