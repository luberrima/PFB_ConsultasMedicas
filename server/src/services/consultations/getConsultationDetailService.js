import { getConsultationDetailModel } from '../../models/consultations/getConsultationDetailModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { selectPhotoByIdModel } from '../../models/photos/selectPhotoByIdModel.js';

export const getConsultationDetailService = async (consultationId) => {
    const consultationDetail = await getConsultationDetailModel(consultationId);

    if (!consultationDetail) {
        throw genereErrorUtils(
            404,
            'CONSULTATION_NOT_FOUND',
            'No se pudo encontrar la consulta'
        );
    }

      const documents = await selectPhotoByIdModel(consultationId);
      consultationDetail.documents = documents;

    return consultationDetail;
};
