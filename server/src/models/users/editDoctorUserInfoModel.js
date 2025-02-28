import {getPool} from '../../db/getPool.js';

export const editDoctorUserInfoModel = async ( id, collegeNumber,  dateOfCollege) => {
    const pool = await getPool();
    const [result] = await pool.query(`UPDATE doctors
    SET collegeNumber = ?, dateOfCollege = ?
    WHERE userid = ?`,[collegeNumber,  dateOfCollege, id]);
    
    return result;
};
