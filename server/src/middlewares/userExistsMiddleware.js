import { getPool } from '../db/getPool.js';

import { genereErrorUtils } from '../utils/genereErrorUtils.js';

export const userExistsMiddleware = async (req, res, next) => {
    try {
        const pool = await getPool();

        const userId = req.user?.id || req.params.userId;

        const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [
            userId,
        ]);

        if (users.length < 1) {
            genereErrorUtils(404, 'NOT_FOUND', 'Usuario no encontrado');
        }

        next();
    } catch (err) {
        next(err);
    }
};
