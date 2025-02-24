import { getPool } from '../../db/getPool.js';

export const deleteConsultationByIdModel = async (id) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM documents WHERE consultationsId = ? `, [id]);

    const [result] = await pool.query(
        `DELETE FROM consultations WHERE id = ? AND diagnostic IS NULL`,
        [id]
    );
    return result;
};
