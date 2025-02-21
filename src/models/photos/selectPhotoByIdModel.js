import { getPool } from '../../db/getPool.js';

export const selectPhotoByIdModel = async (id) => {
    const pool = await getPool();
    const [documents] = await pool.query(
        `SELECT * FROM documents WHERE consultationsId = ?`,
        [id]
    );
    return documents;
};
