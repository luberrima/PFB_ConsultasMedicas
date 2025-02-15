import { getPool } from '../../db/getPool.js';

export const insertDoctorModel = async ({ id, userId, collegeNumber, dateOfCollege, skillId }) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `INSERT INTO doctors (id, userId, collegeNumber, dateOfCollege, skillId) VALUES (?, ?, ?, ?, ?)`,
        [id, userId, collegeNumber, dateOfCollege, skillId]
    );
    return result;
};