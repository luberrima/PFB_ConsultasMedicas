import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getDoctorsBySkillModel = async (skillId) => {
    try {
        const pool = await getPool();
        const [doctors] = await pool.query(
            `SELECT d.id, u.nombre FROM doctors d
            JOIN users u ON d.userId = u.id
            WHERE d.skillId = ? AND d.validate = 1`,
            [skillId]
        );

        return doctors;
    } catch (error) {
        throw genereErrorUtils('Error al obtener los doctores por especialidad', 500);
    }
};
