import {getPool} from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserByRecoverPassModel = async (recoverPassCode) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, email, avatar, nombre, password, active, role, registrationCode, recoverPassCode, modifiedAt, createdAt FROM users WHERE recoverPassCode = ?`,
        [recoverPassCode]
    );

    if (users.length === 0) {
        throw genereErrorUtils('El usuario con ese código de recuperación no existe');
    }

    return users[0];
};
