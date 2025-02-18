import { getPool } from '../../db/getPool.js';

export const insertConsultModel = async (consult) => {
	
	// 1. Crear la conexión a la base de datos
	const pool = await getPool();

	// 2. Crear una entrada en la base de datos
	const [result] = await pool.query(
		`INSERT INTO consultation (id, title, skillId, description, userId )
    VALUES (?, ?, ?, ?, ?)`,
		[consult.id, consult.title, consult.skillId, consult.description, consult.userId]
	);

	// 3. Devolver la entrada creada
	return result;
};
