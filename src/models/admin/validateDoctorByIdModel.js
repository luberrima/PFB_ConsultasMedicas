import { getPool } from '../../db/getPool.js';

export const validateDoctorByIdModel = async (doctorId,validate) => {
    const pool = await getPool();
    console.log("valores recibidos",doctorId,validate);

    const [result] = await pool.query(`UPDATE doctors
SET
validate = ?
WHERE userid = ?`,
        [validate , doctorId]
    );

    console.log("result info",result.info);
    console.log("result info 1",result.changedRows);

    return result;
};