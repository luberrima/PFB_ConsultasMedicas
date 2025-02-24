import { getPool } from '../../db/getPool';
import { genereErrorUtils } from '../../utils/genereErrorUtils';

export const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, password, role, recoveryPassCode, active FROM users WHERE email = ?`,
        [email]
    );

    if (email.lenght === 0) {
        throw genereErrorUtils('Este email no ha sido registrado');
    }
    return users[0];
};
