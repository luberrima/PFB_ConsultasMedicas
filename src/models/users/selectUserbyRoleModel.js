import { getPool } from '../../db/getPool.js';

export const insertDoctorModel = async ({ role }) => {
    const pool = await getPool();
    const [user] = await pool.query(`SELECT * FROM users WHERE role = ?;`, [
        role,
    ]);
    return user;
};
