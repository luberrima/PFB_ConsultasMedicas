import { getPool } from '../../db/getPool.js';

export const getAllUserModel = async () => {
    const pool = await getPool();

    const [consultations] = await pool.query(
       `SELECT 
    U.id AS userId, U.role, U.active, U.UpdatedAt,
    U.username, 
    U.email, 
    U.avatar, 
    U.bio, D.validate, D.collegeNumber, D.dateOfCollege,
    S.name AS Especialidad 
FROM users U
LEFT JOIN doctors D ON U.id = D.userId
LEFT JOIN skills S ON D.skillId = S.id` 
    );

    return consultations;
};