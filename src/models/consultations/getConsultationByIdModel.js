import { getPool } from '../../db/getPool.js';

export const getConsultationByIdModel = async (consultationId) => {
    const pool = await getPool();

    const [consultation] = await pool.query(
        `SELECT id, userId, skillId, doctorId FROM consultation WHERE id = ?`,
        [consultationId]
    );

    return consultation[0];
};
