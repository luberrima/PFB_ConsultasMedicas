import { getPool } from '../../db/getPool.js';

export const selectUserConsultModel = async (userId) => {
    const pool = await getPool();

    const [usersConsult] = await pool.query(
        `SELECT U.id, U.username, U.nombre, U.email, U.role, U.avatar, U.bio, U.active
         FROM users U 
        WHERE U.active=1 AND U.id = ?`,
        [userId]
    );
    return usersConsult;
};
