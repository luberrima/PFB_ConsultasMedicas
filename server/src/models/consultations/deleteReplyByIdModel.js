import { getPool } from '../../db/getPool.js';

export const deleteReplyById = async (replyId) => {
    const pool = await getPool();
    await pool.query("DELETE FROM replys WHERE id = ?", [replyId]);
};