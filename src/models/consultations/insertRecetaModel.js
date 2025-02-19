import { getPool } from '../../db/getPool.js';

export const insertRecetaModel = async (id, consultationsId, name) => {

    // 1. Crear la conexión a la base de datos
    const pool = await getPool();
    const [result] = await pool.query(
        `
        INSERT INTO photos (id, name, consultationsId)
        VALUES (?, ?, ?)
    `,
        [id, name, consultationsId]
    );

    return result;
};