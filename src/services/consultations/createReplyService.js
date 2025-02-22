import { insertReplyModel } from '../../models/consultations/insertReplyModel.js';
import { getConsultationByIdModel } from '../../models/consultations/getConsultationByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const createReplyService = async ({
    consultationId,
    reply,
    userId,
    userRole,
    userSkillId,
}) => {
    const consultation = await getConsultationByIdModel(consultationId);

    if (!consultation) {
        throw genereErrorUtils(
            404,
            'CONSULTATION_NOT_FOUND',
            'La consulta no existe'
        );
    }

    if (userRole === 'paciente') {
        throw genereErrorUtils(
            401,
            'NOT_A_DOCTOR',
            'No puedes responder a consultas siendo paciente'
        );
    }

    if (consultation.userId === userId) {
        throw genereErrorUtils(
            401,
            'ID_ERROR',
            'No puedes responder a tu consultas'
        );
    }

    if (
        userRole === 'doctor' &&
        consultation.skillId !== userSkillId &&
        consultation.doctorId !== userId
    ) {
        throw genereErrorUtils(
            401,
            'SKILL_ID_ERROR',
            'Solo puedes responder a consultas de tu especialidad o asignadas a ti'
        );
    }

    const newReply = await insertReplyModel({ consultationId, reply, userId });

    return newReply;
};
