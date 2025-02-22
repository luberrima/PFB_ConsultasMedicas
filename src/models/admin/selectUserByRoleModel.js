import { getPool } from '../../db/getPool.js';

export const selectUserByRolesModel = async (role) => {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT users.id, username, nombre, email, password, role, avatar, bio, active, Name ,collegeNumber,dateOfCollege,validate
         FROM users 
         LEFT JOIN doctors
         ON users.id=doctors.userid
         LEFT JOIN skills
         ON doctors.skillId=skills.id
         WHERE  users.role = ?
		 ORDER BY validate`,
        [role]
    );

    return user;
};
