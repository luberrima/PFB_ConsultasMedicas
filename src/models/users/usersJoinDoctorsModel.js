import { getPool } from '../../db/getPool.js';

export const usersJoinDoctorsModel = async () => {
    const pool = await getPool();

    const [doctors] = await pool.query(
        `
        SELECT U.id AS user, D.userId AS doctor
        FROM users U
        LEFT JOIN doctors D
        ON U.id = D.userId
        WHERE U.role = "doctor";
        `
    );
    return doctors;
};
