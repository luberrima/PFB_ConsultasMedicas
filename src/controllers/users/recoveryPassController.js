import randomstring from 'randomstring';
import { selectUserByEmailModel } from '../../models/users/selectUserbyEmailModel.js';
import { updateRecoveryPassModel } from '../../models/users/updateRecoveryPassModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { recoveryPassSchema } from '../../schemas/users/recoveryPassSchema.js';

export const recoveryPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        await validateSchemaUtil(recoveryPassSchema, req.body);

        const user = await selectUserByEmailModel(email);

        if (!user) {
            genereErrorUtils(404, 'Not Found', 'usuario');
        }

        const recoveryPassCode = randomstring.generate(10);

        await updateRecoveryPassModel(email, recoveryPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (err) {
        next(err);
    }
};
