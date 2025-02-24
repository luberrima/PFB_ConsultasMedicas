import { getPool } from '../../db/getPool.js';

export const selectSkillByIdModel = async (id) => {
    const pool = await getPool();

    const [skillsName] = await pool.query(`SELECT Name FROM skills WHERE id=?;`, [id]);

    if (skillsName.length===0)
    {
        return "Error";
    }

    return skillsName[0];
};