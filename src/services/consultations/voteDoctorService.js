import { checkConsultationVoteModel, updateConsultationVoteModel } from '../../models/consultations/voteDoctorModel.js';

export const voteDoctorService = async (consultationId, vote) => {
    const consultation = await checkConsultationVoteModel(consultationId);

    if (!consultation) {
        throw new Error('Consulta no encontrada');
    }

    if (consultation.vote !== null) {
        throw new Error('La consulta ya ha sido valorada anteriormente');
    }
    if (consultation.diagnostic === null) {
        throw new Error('La consulta no tiene diagnostico no puedes votarla');
    }

    const result = await updateConsultationVoteModel(consultationId, vote);

    if (result.affectedRows !== 1) {
        throw new Error('No se pudo registrar la valoración');
    }
};