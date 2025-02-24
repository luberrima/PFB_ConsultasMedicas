import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserByrecoveryPassModel = async (recoveryPassCode) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, email, nombre, password, role, avatar, bio, active, registrationCode, recoveryPassCode, createdAt, updatedAt FROM users WHERE recoveryPassCode = ?`,
        [recoveryPassCode]
    );

    if (users.length === 0) {
        throw genereErrorUtils(
            'El usuario con ese código de recuperación no existe'
        );
    }

    return users[0];
};
