import { getPool } from '../../db/getPool.js';

export const getConsultationDetailModel = async (consultationId) => {
    const pool = await getPool();

    const [consultationRows] = await pool.query(
        `SELECT consultations.id, consultations.title, consultations.description, consultations.userId, consultations.skillId, consultations.gravedad, consultations.doctorId, consultations.diagnostic, consultations.vote, consultations.createdAt, consultations.updatedAt, userPatient.username AS userName, 
            userPatient.email AS userEmail,
            userDoctor.nombre AS doctorName
        FROM consultations
        INNER JOIN users AS userPatient ON consultations.userId = userPatient.id
        LEFT JOIN doctors ON consultations.doctorId = doctors.id
        LEFT JOIN users AS userDoctor ON doctors.userId = userDoctor.id
        WHERE consultations.id = ?`,
        [consultationId]
    );

    if (consultationRows.length === 0) {
        return null;
    }

    const consultation = consultationRows[0];

    const [repliesRows] = await pool.query(
        `SELECT replys.id, replys.reply, replys.consultationsId, replys.userId, replys.createdAt, replys.updatedAt, users.username AS userName
        FROM replys
        LEFT JOIN users ON replys.userId = users.id
        WHERE replys.consultationsId = ?`,
        [consultationId]
    );

    return { ...consultation, replies: repliesRows };
};
