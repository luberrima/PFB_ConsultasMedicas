import { getPool } from '../../db/getPool.js';

export const getChatMessagesModel = async (consultationId) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `SELECT id, reply, userId, createdAt, updatedAt 
         FROM replys 
         WHERE consultationsId = ? 
         ORDER BY createdAt ASC`,
        [consultationId]
    );
    return result;
};