import { getPool } from '../../db/getPool.js';

export const selectAverageVoteByDoctorIdModel = async (DoctorId) => {
    const pool = await getPool();

    const [consultations] = await pool.query(
    `SELECT 
    COUNT(*) AS ConsultasTotales,
    COUNT(diagnostic) AS total_respuestas,
    AVG(CASE WHEN vote IS NOT NULL THEN vote END) AS media_valoracion
    FROM consultations 
    WHERE doctorId = ?`,
        [DoctorId]
    );

    return consultations[0];
};