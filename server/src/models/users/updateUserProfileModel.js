import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserProfileModel = async (userId, { username, nombre, email, bio, collegeNumber, dateOfCollege, skillId }) => {
    const pool = await getPool();

    const [user] = await pool.query('SELECT role FROM users WHERE id = ?', [userId]);

    if (user.length === 0) {
        throw genereErrorUtils('Usuario no encontrado', 404);
    }

    const role = user[0].role;

    const [result] = await pool.query(
        `UPDATE users SET username = ?, nombre = ?, email = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [username, nombre, email, bio, userId]
    );

    if (result.affectedRows === 0) {
        throw genereErrorUtils('No se pudo actualizar el perfil del usuario', 500);
    }

    if (role === 'doctor') {
        const [doctorResult] = await pool.query(
            `UPDATE doctors SET collegeNumber = ?, dateOfCollege = ?, skillId = ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`,
            [collegeNumber, dateOfCollege, skillId, userId]
        );

        if (doctorResult.affectedRows === 0) {
            throw genereErrorUtils('No se pudo actualizar el perfil del doctor', 500);
        }
    }

    return { id: userId, username, nombre, email, bio, collegeNumber, dateOfCollege, skillId };
};
