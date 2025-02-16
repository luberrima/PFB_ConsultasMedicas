import { getConsultationDetailModel } from '../../models/consultations/getConsultationDetailModel.js';

export const getConsultationDetailService = async (consultationId) => {
    const consultationDetail = await getConsultationDetailModel(consultationId);

    if (!consultationDetail) {
        throw new Error('Consulta no encontrada');
    }

    return consultationDetail;
};