import {getPool} from '../../db/getPool.js';

export const editUserInfoModel = async ( id, nombre,  bio) => {
    const pool = await getPool();
    

    const [result] = await pool.query(`UPDATE users
    SET nombre = ?, bio = ?
    WHERE id = ?`,[nombre,  bio, id]);

    
    
    return result;
};
