import { getConsultationDetailModel } from '../../models/consultation/getConsultationDetailModel.js';

export const getConsultationDetailService = async (consultationId) => {
    const consultationDetail = await getConsultationDetailModel(consultationId);

    if (!consultationDetail) {
        throw new Error('Consulta no encontrada');
    }

    return consultationDetail;
};
