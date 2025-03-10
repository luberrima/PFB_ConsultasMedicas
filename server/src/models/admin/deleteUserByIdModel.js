import { getPool } from '../../db/getPool.js';

export const deleteUserByIdModel = async (id) => {
    const pool = await getPool();
    const [result] = await pool.query(`DELETE FROM users WHERE id = ? `, [id]);

    return result;
};