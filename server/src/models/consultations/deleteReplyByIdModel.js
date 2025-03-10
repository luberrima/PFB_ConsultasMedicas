import { getPool } from "../../db/getPool.js";

export const deleteReplyById = async (messageId) => {
    const pool = getPool();
    await pool.query("DELETE FROM replies WHERE id = ?", [messageId]);
};