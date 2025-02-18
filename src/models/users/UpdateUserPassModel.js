import bcrypt from 'bcrypt';
import {getPool} from '../../db/getPool.js';
import {selectUserByRecoverPassModel} from './selectUserByRecoveryPassCodeModel.js';//El fichero estaba mal nombrado lo renombrado.
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserPassModel = async (recoverPassCode, newPass) => {
    const pool = await getPool();

    const user = await selectUserByRecoverPassModel(recoverPassCode);
    console.log({ user, recoverPassCode });
 
    if (!user) {
        throw genereErrorUtils('Codigo de recuperación incorrecto o usuario no encontrado');
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

