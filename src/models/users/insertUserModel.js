import { getPool } from '../../db/getPool.js';

export const insertUserModel = async ({ id, username, email, password, role, registrationCode }) => {
    const pool = getPool();
    const [result] = await pool.query(
        `INSERT INTO users (id, username, email, password, role, registrationCode) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, username, email, password, role, registrationCode]
    );
    return result;
};