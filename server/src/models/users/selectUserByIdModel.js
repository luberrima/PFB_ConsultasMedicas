import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT id, username, nombre, email, role, avatar, bio,
         FROM users 
         WHERE id = ? AND active = 1`,
        [userId]
    );

    if (user.length === 0) {
        throw genereErrorUtils('No existen usuarios');
    }

    return user[0];
};
