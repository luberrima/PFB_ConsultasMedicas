import {getPool} from '../../db/getPool.js';

export const editAvatarModel = async (id, avatarName) => {
    const pool = await getPool();
   

    const [result] = await pool.query(`UPDATE users
    SET avatar = ?
    WHERE id = ?`,[avatarName, id]);


    
    return result;
};
