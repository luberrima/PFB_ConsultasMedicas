import { deleteConsultationService } from '../../services/consultations/deleteConsultationService.js';

export const deleteConsultationController = async (req, res, next) => {
    try {

        console.log('QUE TENGO DE USER req.consut', req.consult );


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
