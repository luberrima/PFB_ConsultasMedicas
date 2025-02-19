import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserByrecoveryPassCodeModel = async (recoveryPassCode) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, email, avatar, nombre, password, active, role, registrationCode, recoveryPassCode, modifiedAt, createdAt FROM users WHERE recoveryPassCode = ?`,
        [recoveryPassCode]
    );

    if (users.length === 0) {
        throw genereErrorUtils(
            'El usuario con ese código de recuperación no existe'
        );
    }

    return users[0];
};
