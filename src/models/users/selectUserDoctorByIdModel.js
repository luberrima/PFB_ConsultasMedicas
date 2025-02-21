import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserDoctorByIdModel = async (userId) => {
    const pool = await getPool();

    const [usersDoctor] = await pool.query(
        `SELECT users.id, username, nombre, email, password, role, avatar, bio, active, Name ,collegeNumber,dateOfCollege,validate, registrationCode, recoveryPassCode, users.createdAt
         FROM users 
         JOIN doctors
         ON users.id=doctors.userid
         JOIN skills
         ON doctors.skillId=skills.id
         WHERE users.active=1 and doctors.validate=1 and users.id = ?`,
        [userId]
    );

   /* if (usersDoctor.length === 0) {
        throw genereErrorUtils(
            'El usuario no existe o esta inactivo/No validado'
        );
    }*/

    return usersDoctor[0];
};
