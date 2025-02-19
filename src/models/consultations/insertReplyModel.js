import { getPool } from '../../db/getPool.js';
import crypto from 'crypto';

export const insertReplyModel = async ({ consultationId, reply, userId }) => {
    const pool = await getPool();
    const id = crypto.randomUUID();

    const [result] = await pool.query(
        `INSERT INTO replys (id, reply, consultationsId, userId) VALUES (?, ?, ?, ?)`,
        [id, reply, consultationId, userId]
    );

    if (result.affectedRows !== 1) {
        throw new Error('No se pudo insertar la respuesta');
    }

    return { id, reply, consultationId, userId };
};
