import { getPool } from '../../db/getPool.js';

export const getAllDoctorBySkillModel = async () => {
    const pool = await getPool();

    const [doctorbyskill] = await pool.query(
        `SELECT U.username,U.id,D.skillId ,S.Name FROM users U
            JOIN doctors D 
            ON U.id=D.userid
            LEFT JOIN skills S 
            ON D.skillId=S.id
            WHERE U.active=1 and D.validate=1`
        
    );

    return doctorbyskill;
};
