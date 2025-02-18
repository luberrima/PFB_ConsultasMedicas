import deleteConsulationModel from '../../models/consultations/deleteConsultationModel.js';

export const deleteConsultationController = async (req, res, next) => {
    try {
        const { ConsultationsId } = req.params;

        await deleteConsulationModel(ConsultationsId);

        res.send({
            status: 'ok',
            message: `La consulta con id ${ConsultationsId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};
