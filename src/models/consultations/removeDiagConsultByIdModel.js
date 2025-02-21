import { getPool } from '../../db/getPool.js';

export const removeDiagConsultByIdModel = async (id) => {


    //  Obtener la conexión con la base de datos
    const pool = await getPool();

    //  Realizar la consulta
    const [result] = await pool.query(
        `UPDATE consultations SET diagnostic = NULL WHERE id = ? AND vote IS NULL `,
        [id]
    );

    // 3. Devolver el resultado
    return result;
};