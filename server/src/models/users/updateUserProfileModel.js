import { getPool } from '../../db/getPool.js';

// Obtener un usuario por su ID
export const getUserById = async (id) => {
    const pool = await getPool();
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return user.length > 0 ? user[0] : null; // Retorna el primer usuario o null si no existe
};

// Actualizar los datos de un usuario
export const updateUser = async (id, updatedUser) => {
    const pool = await getPool();
    const updateFields = Object.keys(updatedUser).reduce((fields, key) => {
        if (updatedUser[key] !== undefined) {
            fields.push(`${key} = ?`);
        }
        return fields;
    }, []);

    const updateValues = Object.values(updatedUser).filter(value => value !== undefined);

    if (updateFields.length > 0) {
        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        await pool.query(updateQuery, [...updateValues, id]);
    }

    return true;
};
