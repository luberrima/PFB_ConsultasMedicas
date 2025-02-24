import { sendValidationEmailService } from '../../services/users/sendValidationEmailService.js';

export const sendValidationEmailController = async (req, res, next) => {
    try {
        const { email, registrationCode } = req.body;
        await sendValidationEmailService(email, registrationCode);
        res.status(200).send({
            status: 'ok',
            message: 'Correo de validación enviado correctamente',
        });
    } catch (error) {
        next(error);
    }
};