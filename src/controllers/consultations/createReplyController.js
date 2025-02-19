import { createReplyService } from '../../services/consultations/createReplyService.js';

export const createReplyController = async (req, res, next) => {
    try {
        const { consultationId } = req.params;
        const { reply } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;
        const userSkillId = req.user.skillId || null;

        const newReply = await createReplyService({ consultationId, reply, userId, userRole, userSkillId });

        res.status(201).send({
            status: 'ok',
            message: 'Respuesta creada correctamente',
            data: newReply,
        });
    } catch (error) {
        next(error);
    }
};