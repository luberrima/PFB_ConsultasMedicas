import { getPool } from '../../db/getPool.js';

export const getAllConsultationModel = async () => {
    const pool = await getPool();

    const [consultations] = await pool.query(
       `SELECT * FROM consultations` 
    );

    return consultations;
};