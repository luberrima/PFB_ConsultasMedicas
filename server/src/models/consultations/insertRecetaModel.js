import { getPool } from '../../db/getPool.js';

export const insertRecetaModel = async (id, consultationsId, name, replyId) => {

    // 1. Crear la conexión a la base de datos
    const pool = await getPool();


    const [result] = await pool.query(
        `
        INSERT INTO documents (id, name, consultationsId, replyId)
        VALUES (?, ?, ?, ?)
    `,
        [id, name, consultationsId, replyId]
    );

    return result;
};