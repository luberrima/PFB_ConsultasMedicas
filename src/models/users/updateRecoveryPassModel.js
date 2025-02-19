import { getPool } from '../../db/getPool.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { sendEmailBrevoUtil } from '../../utils/sendEmailBrevoUtil.js';

export const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);

    const Subject = 'Recuperación de contraseña en GoodDoctor';
    
    const text = `
            <p>¡Hola!</p>
            <p>Se ha solicitado la recuperación de contraseña para este email en GoodDoctor</p>

            <p>Use el siguiente código para crear una nueva contraseña: ${recoverPassCode}</p>

            <p>Si no ha sido usted, puede ignorar este email</p>

            <p>Un saludo,</p>
            <p>El equipo de GoodDoctor</p>

        `;

    try {
        await sendEmailBrevoUtils(to, Subject, text);
        console.log('Correo enviado exitosamente');
    } catch (err) {
        console.error('Error al enviar el correo:', error);
        throw genereErrorUtils('Error al enviar el correo');
    }
};

