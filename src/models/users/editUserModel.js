import {getPool} from '../../db/getPool.js';
import {genereErrorUtils} from '../../utils/genereErrorUtils.js';

export const editUserModel = async ( username, nombre, email, userId) => {
    const pool = await getPool();


    const query = `
    UPDATE users
    SET username = ?, nombre = ?, email = ?
    WHERE id = ?
`;
    const values = [username, nombre, email, userId];

    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
        throw genereErrorUtils('No ha sido posible la actualización del usuario');
    }
    return result;
};
