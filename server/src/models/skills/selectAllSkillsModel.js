import { getPool } from '../../db/getPool.js';

export const selectAllskillModel = async () => {
    const pool = await getPool();

    const [skills] = await pool.query(`SELECT * FROM skills;`);

    return skills;
};