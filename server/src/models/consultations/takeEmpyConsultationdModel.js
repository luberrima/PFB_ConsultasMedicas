import { getPool } from '../../db/getPool.js';

export const takeEmpyConsultationdModel = async (id,consultationId) => {


    // Obtener la conexión con la base de datos
    const pool = await getPool();

    //  Realizar la consulta
   const [result] = await pool.query(
       `UPDATE consultations SET doctorId = ? WHERE id = ? AND vote IS NULL `,
     [id,consultationId]
  );

    //  Devolver el resultado
   
    
    return result ;
};