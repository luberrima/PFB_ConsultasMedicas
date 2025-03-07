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
    const frontendHost = process.env.FRONTEND_HOST || 'http://localhost:3000';
    const resetUrl = `${frontendHost}/password-reset/${recoveryPassCode}`;

    const text = `
        <p>¡Hola!</p>
        <p>Se ha solicitado la recuperación de contraseña para este email en GoodDoctor.</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Si no has solicitado este cambio, ignora este correo.</p>
        <p>Un saludo,</p>
        <p>El equipo de GoodDoctor</p>
    `;

    try {
        await sendEmailBrevoUtils(to, Subject, text);
    } catch (err) {
        throw genereErrorUtils('Error al enviar el correo');
    }
};
