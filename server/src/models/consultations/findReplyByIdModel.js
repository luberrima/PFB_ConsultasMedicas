import { getPool } from "../../db/getPool.js";

export const findReplyById = async (messageId) => {
    const pool = getPool();
    const [result] = await pool.query(
        "SELECT id, userId FROM replies WHERE id = ?",
        [messageId]
    );
    return result.length ? result[0] : null;
};