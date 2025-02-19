import randomstring from 'randomstring';
import { selectUserByEmailModel } from '../../models/users/selectUserbyEmailModel.js';
import { updateRecoveryPassModel } from '../../models/users/updateRecoveryPassModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const recoveryPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await selectUserByEmailModel(email);

        if (!user) {
            genereErrorUtils('Usuario no encontrado');
        }

        const recoveryPassCode = randomstring.generate(10);

        await updateRecoveryPassModel(email, recoveryPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (error) {
        next(error);
    }
};
