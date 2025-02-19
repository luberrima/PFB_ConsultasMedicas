import { getPool } from '../../db/getPool.js';

export const insertConsultModel = async (consult) => {

    //  Crear la conexión 
    const pool = await getPool();

    //  Crear una entrada 
    const [result] = await pool.query(
        `INSERT INTO consultations (id, title, skillId, description, userId )
    VALUES (?, ?, ?, ?, ?)`,
        [consult.id, consult.title, consult.skillId, consult.description, consult.userId]
    );

    //  Mandar result
    return result;
};