import { getPool } from '../../db/getPool.js';

export const getConsultationByIdModel = async (consultationId) => {
    const pool = await getPool();

    const [consultations] = await pool.query(
        `SELECT id, userId, skillId, doctorId FROM consultations WHERE id = ?`,
        [consultationId]
    );

    return consultations[0];
};
