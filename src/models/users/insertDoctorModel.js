import { getPool } from '../../db/getPool.js';

export const insertDoctorModel = async ({ id, userId, skillId, collegeNumber, dateOfCollege }) => {
    const pool = getPool();
    const [result] = await pool.query(
        `INSERT INTO doctors (id, userId, skillId, collegeNumber, dateOfCollege) VALUES (?, ?, ?, ?, ?)`,
        [id, userId, skillId, collegeNumber, dateOfCollege]
    );
    return result;
};