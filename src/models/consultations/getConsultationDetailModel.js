import { getPool } from '../../db/getPool.js';

export const getConsultationDetailModel = async (consultationId) => {
    const pool = await getPool();

    const [consultationRows] = await pool.query(
        `SELECT consultation.id, consultation.title, consultation.description, consultation.userId, consultation.skillId, consultation.gravedad, consultation.doctorId, consultation.diagnostic, consultation.vote, consultation.createdAt, consultation.updatedAt, users.username AS userName, users.email AS userEmail
        FROM consultation
        INNER JOIN users ON consultation.userId = users.id
        WHERE consultation.id = ?`,
        [consultationId]
    );

    if (consultationRows.length === 0) {
        return null;
    }

    const consultation = consultationRows[0];

    const [repliesRows] = await pool.query(
        `SELECT replys.id, replys.reply, replys.consultationId, replys.userId, replys.createdAt, replys.updatedAt, users.username AS userName
        FROM replys
        LEFT JOIN users ON replys.userId = users.id
        WHERE replys.consultationId = ?`,
        [consultationId]
    );

    return { ...consultation, replies: repliesRows };
};
