import { getPool } from '../../db/getPool.js';

export const selectConsultByIdModel = async (id) => {
    //  Obtener la conexión con la base de datos
    console.log('QUE TENGO COMO ID en el MODEL', id); 
    const pool = await getPool();

    //  Realizar la consulta
    const [consulta] = await pool.query(
        `SELECT * FROM consultations WHERE id = ?`,
        [id]
    );

    // 3. Devolver el resultado
    console.log('QUE TENGO EN EL retorno del model LA CONSUTA', consulta[0]); 
    return consulta[0];
};
