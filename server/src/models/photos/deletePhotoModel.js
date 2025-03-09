import { getPool } from '../../db/getPool.js';

export const deletePhotoModel = async (id) => {
    const pool = await getPool();
    const [documents] = await pool.query(
        `DELETE FROM documents WHERE consultationsId = ?`,
        [id]
    );
    return documents;
};