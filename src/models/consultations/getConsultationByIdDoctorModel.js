import { getPool } from '../../db/getPool.js';

export const getConsultationByIddoctorModel = async (doctorId) => {
    const pool = await getPool();

    const [consultations] = await pool.query(
        `SELECT id, userId, skillId, doctorId FROM consultations WHERE doctorId = ?`,
        [doctorId]
    );

    return consultations[0];
};
