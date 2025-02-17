import { getPool } from '../../db/getPool.js';

export const usersJoinDoctorsModel = async () => {
    const pool = await getPool();

    const [doctors] = await pool.query(
        `
            SELECT D.*, U.id AS userId
            FROM doctors D
            LEFT JOIN users U
            ON D.userId = U.id;
            
        // SELECT U.id AS user, D.*
        // FROM users U
        // LEFT JOIN doctors D
        // ON U.id = D.userId
        // WHERE U.role = "doctor";
        `
    );
    return doctors;
};
