import { deleteConsulationModel } from '../../models/consultations/deleteConsultationModel.js';

export const deleteConsultationController = async (req, res, next) => {
    try {
        const { consultationId } = req.params;

        await deleteConsulationModel(consultationId);

        res.send({
            status: 'ok',
            message: `La consulta con id ${consultationId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};
