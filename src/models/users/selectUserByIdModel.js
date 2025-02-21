import { getPool } from '../../db/getPool';
import { genereErrorUtils } from '../../utils/genereErrorUtils';

export const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, nombre, email, password, role, avatar, bio, active, registrationCode, recoveryPassCode, createdAt FROM users WHERE id = ?`,
        [userId]
    );

    if (users.length === 0) {
        throw genereErrorUtils('El usuario no existe');
    }

    return users[0];
};
