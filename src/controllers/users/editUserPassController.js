import { updateUserPassModel } from '../../models/users/updateUserPassModel.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { editUserPassSchema } from '../../schemas/users/editUserPassSchema.js';

export const editUserPassController = async (req, res, next) => {
    try {
        const { recoveryPassCode, newPass } = req.body;

        await validateSchemaUtil(editUserPassSchema, req.body);
        await updateUserPassModel(recoveryPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};
