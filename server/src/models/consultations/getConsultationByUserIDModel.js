import { getPool } from '../../db/getPool.js';

export const getConsultationByUserIDModel = async (userId) => {
    const pool = await getPool();

    const [consultations] = await pool.query(
        `SELECT consultations.id,title,description,userId, doctorId ,skillId, skills.name as "Especialidad", gravedad, diagnostic, vote FROM consultations 
        JOIN skills ON consultations.skillId=skills.id
        
        WHERE doctorId = ? || userId= ? `,
        [userId,userId]
    );

    return consultations;
};


