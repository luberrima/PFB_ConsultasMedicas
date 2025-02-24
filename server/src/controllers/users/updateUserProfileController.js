import { updateUserProfileService } from '../../services/users/updateUserProfileService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserProfileController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const newUserInfo = req.body;

        if (!newUserInfo) {
            throw genereErrorUtils(400, 'NO_DATA UPDATE', 'No se han enviado datos para actualizar',);
        }

        const updatedUser = await updateUserProfileService(id, newUserInfo);

        res.status(200).send({
            status: 'ok',
            message: 'Perfil actualizado con éxito',
            data: { user: updatedUser },
        });
    } catch (error) {
        next(error);
    }
};
