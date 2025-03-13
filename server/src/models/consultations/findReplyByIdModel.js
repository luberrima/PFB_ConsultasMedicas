import { getPool } from "../../db/getPool.js";

export const findReplyById = async (replyId) => {
    const pool = await getPool(); // ⬅ Aquí agregamos "await"
    

    const [result] = await pool.query(
        "SELECT id, userId FROM replys WHERE id = ?",
        [replyId]
    );

    return result.length ? result[0] : null;
};