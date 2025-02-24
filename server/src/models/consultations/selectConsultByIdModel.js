import { getPool } from '../../db/getPool.js';

export const selectConsultByIdModel = async (id) => {
    //  Obtener la conexión con la base de datos
    const pool = await getPool();

    //  Realizar la consulta
    const [consulta] = await pool.query(
        `SELECT * FROM consultations WHERE id = ?`,
        [id]
    );

    // 3. Devolver el resultado
    return consulta[0];
};
