import { getPool } from '../../db/getPool.js';

export const insertRecetaModel = async (id, consultationsId, name) => {

    // 1. Crear la conexión a la base de datos
    const pool = await getPool();
console.log("INSERTANDO DATOS EN DOCUMENTS");
console.log("id de model insercion",id);
console.log("consultationsId de model insercion",consultationsId);
console.log("name de model insercion",name);

    const [result] = await pool.query(
        `
        INSERT INTO documents (id, name, consultationsId)
        VALUES (?, ?, ?)
    `,
        [id, name, consultationsId]
    );

    return result;
};