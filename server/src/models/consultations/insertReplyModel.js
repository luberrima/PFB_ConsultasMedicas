import { getPool } from '../../db/getPool.js';


export const insertReplyModel = async ({replyId, consultationId, reply, userId }) => {
    const pool = await getPool();
    

    const [result] = await pool.query(
        `INSERT INTO replys (id, reply, consultationsId, userId) VALUES (?, ?, ?, ?)`,
        [replyId, reply, consultationId, userId]
    );

    

    return  result;
};


