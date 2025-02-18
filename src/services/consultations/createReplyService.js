import { insertReplyModel } from '../../models/consultations/insertReplyModel.js';
import { getConsultationByIdModel } from '../../models/consultations/getConsultationByIdModel.js';

export const createReplyService = async ({ consultationId, reply, userId, userRole, userSkillId }) => {
    const consultation = await getConsultationByIdModel(consultationId);

    if (!consultation) {
        throw new Error('La consulta no existe');
    }

    if (userRole === 'paciente' && consultation.userId !== userId) {
        throw new Error('No puedes responder a consultas de otros pacientes');
    }

    if (userRole === 'doctor' && consultation.skillId !== userSkillId && consultation.doctorId !== userId) {
        throw new Error('Solo puedes responder a consultas de tu especialidad o asignadas a ti');
    }

    const newReply = await insertReplyModel({ consultationId, reply, userId });

    return newReply;
};