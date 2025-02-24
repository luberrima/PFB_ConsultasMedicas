import { getConsultationDetailService } from '../../services/consultations/getConsultationDetailService.js';

export const getConsultationDetailController = async (req, res, next) => {
    try {
        const { consultationId } = req.params;
        const consultationDetail = await getConsultationDetailService(consultationId);

        res.status(200).send({
            status: 'ok',
            data: consultationDetail,
        });
    } catch (error) {
        next(error);
    }
};