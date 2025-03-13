import { deleteConsultationService } from '../../services/consultations/deleteConsultationService.js';

export const deleteConsultationController = async (req, res, next) => {
    try {

        


        const consultation = req.consult;

        await deleteConsultationService(consultation);

        res.send({
            status: 'ok',
            message: `La consulta con id ${consultation.id} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};
