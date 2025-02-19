import bcrypt from 'bcrypt';
import { getPool } from '../../db/getPool.js';
import { selectUserByrecoveryPassModel } from './selectUserByrecoveryPassCodeModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserPassModel = async (recoveryPassCode, newPass) => {
    const pool = await getPool();

    const user = await selectUserByrecoveryPassModel(recoveryPassCode);
    console.log({ user, recoveryPassCode });

    if (!user) {
        throw genereErrorUtils(
            'Codigo de recuperación incorrecto o usuario no encontrado'
        );
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    await pool.query(
        `UPDATE users SET password = ?, recoveryPassCode = null WHERE recoveryPassCode = ?`,
        [hashedPass, recoveryPassCode]
    );
};
