import { getPool } from '../../db/getPool.js';

export const validateDoctorByIdModel = async (doctorId,validate) => {
    const pool = await getPool();
    const [result] = await pool.query(`UPDATE doctors
SET
validate = ?
WHERE userid = ?`,
        [validate , doctorId]
    );

    return result;
};