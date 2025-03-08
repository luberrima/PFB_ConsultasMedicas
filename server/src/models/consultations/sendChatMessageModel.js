import { getPool } from '../../db/getPool.js';

export const sendChatMessageModel = async (replyId, reply, consultationId, userId) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `INSERT INTO replys (id, reply, consultationsId, userId, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, NOW(), NULL)`,
        [replyId, reply, consultationId, userId]
    );
    return result;
};