import { getPool } from '../../db/getPool.js';

export const checkConsultationVoteModel = async (consultationId) => {
    const pool = await getPool();
    const [consultation] = await pool.query(
        `SELECT vote FROM consultations WHERE id = ?`,
        [consultationId]
    );
    return consultation[0] || null;
};

export const updateConsultationVoteModel = async (consultationId, vote) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `UPDATE consultations SET vote = ? WHERE id = ?`,
        [vote, consultationId]
    );
    return result;
};