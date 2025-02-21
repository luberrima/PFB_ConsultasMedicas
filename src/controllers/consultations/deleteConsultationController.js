import { deleteConsultationService } from '../../services/consultations/deleteConsultationService.js';

export const deleteConsultationController = async (req, res, next) => {
    try {
        console.log(
            'ESTO ES EL REQ.ENTRY QUE LO ESTOY LLAMANDO EN UN SERVICIO',
            req.entry
        );

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
