import { getPool } from '../../db/getPool.js';

export const getConsultationBySkillModel = async ( skillId) => {
    const pool = await getPool();

    

    const [consultations] = await pool.query(
        `SELECT id, userId, skillId, doctorId, diagnostic, vote FROM consultations WHERE doctorId IS NULL && skillId = ?`,
        [ skillId]
    );

    return consultations;
};
