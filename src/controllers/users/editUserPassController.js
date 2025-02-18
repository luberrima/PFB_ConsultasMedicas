import { updateUserPassModel } from '../../models/users/updateUserPassModel.js';

export const editUserPassController = async (req, res, next) => {
    try {
        const { recoverPassCode, newPass } = req.body;

        await updateUserPassModel(recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};
