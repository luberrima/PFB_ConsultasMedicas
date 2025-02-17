import { getPool } from '../../db/getPool.js';

export const updateActiveUserModel = async (registrationCode) => {
	
	const pool = await getPool();

	
	const [result] = await pool.query(
		`UPDATE users SET active = 1 WHERE registrationCode = ?;`,
		[registrationCode]
	);

	return result;
};
