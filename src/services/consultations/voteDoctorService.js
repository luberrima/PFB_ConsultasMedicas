import {
    checkConsultationVoteModel,
    updateConsultationVoteModel,
} from '../../models/consultations/voteDoctorModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const voteDoctorService = async (consultationId, vote) => {
    const consultation = await checkConsultationVoteModel(consultationId);

    if (!consultation) {
        throw genereErrorUtils(
            401,
            'CONSULTATION_NOT_FOUND',
            'No se pudo encontrar la consulta'
        );
    }

    if (consultation.vote !== null) {
        throw genereErrorUtils(
            401,
            'CONSULTATION_ALREADY_VOTED',
            'La consulta ya ha sido valorada'
        );
    }
    if (consultation.diagnostic === null) {
        throw genereErrorUtils(
            401,
            'DIAGNOSTIC_NOT_FOUND',
            'La consulta no tiene diagnóstico, no puedes votarla'
        );
    }

    const result = await updateConsultationVoteModel(consultationId, vote);

    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            401,
            'VOTE_FAILED',
            'No se pudo registrar la valoración'
        );
    }
};
