import {getPool} from '../../db/getPool.js';

export const editUserInfoModel = async ( id, nombre,  bio) => {
    const pool = await getPool();
    console.log("que valor tiene  id, nombre,  bio", id, nombre,  bio);

    const [result] = await pool.query(`UPDATE users
    SET nombre = ?, bio = ?
    WHERE id = ?`,[nombre,  bio, id]);

    console.log(result);
    
    return result;
};
