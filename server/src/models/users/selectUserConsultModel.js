import { getPool } from '../../db/getPool.js';

export const selectUserConsultModel = async (userId) => {
    const pool = await getPool();

    const [usersConsult] = await pool.query(
        `SELECT U.id, U.username, U.nombre, U.email, U.password, U.role, U.avatar, U.bio, U.active, C.title, C.description, C.gravedad, C.skillId, C.diagnostic, C.vote, C.createdAt, U.createdAt
         FROM users U 
         LEFT JOIN consultations C
         ON U.id=C.userid
        WHERE U.active=1 AND U.id = ?`,
        [userId]
    );
    return usersConsult;
};
