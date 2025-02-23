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
      if (consultation.diagnostic !== null) {
        throw genereErrorUtils(
            401,
            'IS_CLOSET',
            'consulta ya esta cerrada'
        );
    } 

    if (userRole === 'paciente' && consultation.userId !== userId) {
        throw genereErrorUtils(
            401,
            'NOT_OWNER',
            'No puedes responder por que no eres el dueño de la consulta'
        );
    }

   /*  if (consultation.userId === userId) {
        throw genereErrorUtils(
            401,
            'ID_ERROR',
            'No puedes responder a tu consultas'
        );
    } */

    if (
        userRole === 'doctor' &&
        consultation.doctorId !== userId
    ) {
        throw genereErrorUtils(
            401,
            'DOCTOR_ID_ERROR',
            'Solo puedes responder a consultas asignadas a ti'
        );
    }
    const replyId = crypto.randomUUID();

    const newReply = await insertReplyModel({ replyId, consultationId, reply, userId });

    if (newReply.affectedRows !== 1) {
        throw genereErrorUtils(
            401,
            'REPLY_ERROR',
            'No se modifico la respuesta'
        );
    }

    return replyId;
};
