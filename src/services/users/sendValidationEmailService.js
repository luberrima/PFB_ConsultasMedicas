import { sendEmailBrevoUtil } from '../../utils/sendEmailBrevoUtil.js';

export const sendValidationEmailService = async (email, registrationCode) => {
    const emailText = `Activa tu cuenta aquí: http://localhost:5173/validate/${registrationCode}`;
    await sendEmailBrevoUtil(email, 'Activa tu cuenta', emailText);
};
