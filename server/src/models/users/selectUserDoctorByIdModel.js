import { getPool } from '../../db/getPool.js';
/*import { genereErrorUtils } from '../../utils/genereErrorUtils.js';*/


export const selectUserDoctorByIdModel = async (userId) => {
    const pool = await getPool();

    const [usersDoctor] = await pool.query(
        `SELECT users.id, username, nombre, email, password, role, avatar, bio, doctors.skillId ,active, Name ,collegeNumber,dateOfCollege,validate, registrationCode, recoveryPassCode, users.createdAt
         FROM users 
         JOIN doctors
         ON users.id=doctors.userid
         JOIN skills
         ON doctors.skillId=skills.id
         WHERE users.active=1 and doctors.validate=1 and users.id = ?`,
        [userId]
    );

    return usersDoctor;
};
