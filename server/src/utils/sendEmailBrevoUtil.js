import brevo from '@getbrevo/brevo';

import { SMTP_USER, SMTP_API_KEY } from '../../env.js';
import { genereErrorUtils } from './genereErrorUtils.js';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY);
export const sendEmailBrevoUtils = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.to = [{ email: to }];

        sendSmtpEmail.htmlContent = text;
        sendSmtpEmail.sender = {
            name: 'Equipo de Good Doctor',
            email: SMTP_USER,
        };
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("envio mail")
    } catch (error) {
        throw genereErrorUtils(
            500,
            'SEND_EMAIL_ERROR',
            'Error al enviar el email'
        );
    }
};
