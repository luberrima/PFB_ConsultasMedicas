import { getPool } from '../../db/getPool.js';

export const selectUsersbyRoleModel = async ({ role }) => {
    const pool = await getPool();
    const [users] = await pool.query(`SELECT * FROM users WHERE role = ?;`, [
        role,
    ]);
    return users;
};
