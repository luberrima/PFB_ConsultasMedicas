import { getPool } from '../../db/getPool.js';

export const getConsultationDetailModel = async (consultationId) => {
    const pool = await getPool();

    const [consultationRows] = await pool.query(
        `SELECT consultations.id, consultations.title, consultations.description, consultations.userId, consultations.skillId, consultations.gravedad, consultations.doctorId, consultations.diagnostic, consultations.vote, consultations.createdAt, consultations.updatedAt, users.username AS userName, users.email AS userEmail
        FROM consultations
        INNER JOIN users ON consultations.userId = users.id
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