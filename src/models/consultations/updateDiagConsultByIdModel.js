import { getPool } from '../../db/getPool.js';

export const updateDiagConsultByIdModel = async (diagnostic, id) => {


    // Obtener la conexión con la base de datos
    const pool = await getPool();

    //  Realizar la consulta
    const [result] = await pool.query(
        `UPDATE consultations SET diagnostic = ? WHERE id = ? AND vote IS NULL `,
        [diagnostic, id]
    );

    //  Devolver el resultado
    console.log(result);
    
    return result;
};