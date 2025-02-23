import { deleteConsultationService } from '../../services/consultations/deleteConsultationService.js';

export const deleteConsultationController = async (req, res, next) => {
    try {


        const consultationId = req.entry;

        await deleteConsultationService(consultationId);

        res.send({
            status: 'ok',
            message: `La consulta con id ${consultationId.id} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};
