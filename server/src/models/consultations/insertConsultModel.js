import { getPool } from '../../db/getPool.js';

export const insertConsultModel = async (consult) => {

    //  Crear la conexión 
    const pool = await getPool();
   
    
    let result=[]

    if (!consult.doctorId || consult.doctorId=="" )
    {  [result] = await pool.query(
        `INSERT INTO consultations (id, title, skillId, description, userId,gravedad )
    VALUES (?, ?, ?, ?, ?, ?)`,
        [consult.id, consult.title, consult.skillId, consult.description, consult.userId,consult.gravedad]
    );}
       
    else
    {
         [result] = await pool.query(
            `INSERT INTO consultations (id, title, skillId, description, userId,gravedad,doctorId )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [consult.id, consult.title, consult.skillId, consult.description, consult.userId,consult.gravedad,consult.doctorId]
        );
    }

    //  Crear una entrada 
   

    //  Mandar result
    return result;
};