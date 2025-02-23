import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { sendEmailBrevoUtils } from '../../utils/sendEmailBrevoUtil.js';

export const updateRecoveryPassModel = async (email, recoveryPassCode) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET recoveryPassCode = ? WHERE email = ?`, [
        recoveryPassCode,
        email,
    ]);

    const to = email;

    const Subject = 'Recuperación de contraseña en GoodDoctor';

    const text = `
            <p>¡Hola!</p>
            <p>Se ha solicitado la recuperación de contraseña para este email en GoodDoctor</p>

            <p>Use el siguiente código para crear una nueva contraseña: ${recoveryPassCode}</p>

            <p>Si no ha sido usted, puede ignorar este email</p>

            <p>Un saludo,</p>
            <p>El equipo de GoodDoctor</p>

        `;

    try {
        await sendEmailBrevoUtils(to, Subject, text);
    }   catch (err) {
        throw genereErrorUtils('Error al enviar el correo');
    }
};
