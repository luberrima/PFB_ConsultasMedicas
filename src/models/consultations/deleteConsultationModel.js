import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const deleteConsulationModel = async (consultationId) => {
    const pool = await getPool();

    const [consultation] = await pool.query(
        `SELECT diagnostic FROM consultations WHERE id=? LIMIT 1`,
        [consultationId]
    );

    if (consultation.length > 0 && consultation[0].diagnostic) {
        throw genereErrorUtils(
            'No se puede borrar la consulta porque tiene un diagnóstico asociado'
        );
    }

    await pool.query(`DELETE FROM consultations WHERE id=?`, [consultationId]);
};
