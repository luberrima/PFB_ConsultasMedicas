import { getPool } from '../../db/getPool.js';

export const deleteConsultationAllByIdModel = async (id) => {
    const pool = await getPool(); 

    const [result] = await pool.query(
        `DELETE FROM consultations WHERE userId = ?`,
        [id]
    );
    return result;
};