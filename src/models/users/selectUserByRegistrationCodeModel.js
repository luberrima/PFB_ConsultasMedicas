import { getPool } from '../../db/getPool.js';

export const selectUserByRegistrationCodeModel = async (registrationCode) => {
	
	const pool = await getPool();

	
	const [user] = await pool.query(
		`SELECT * FROM users WHERE registrationCode = ?;`,
		[registrationCode]
	);

	return user[0];
};
