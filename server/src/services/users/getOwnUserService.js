import { selectUserConsultModel } from '../../models/users/selectUserConsultModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getOwnUserService = async (id) => {

    const user = await selectUserConsultModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USER_NOT_FOUND',
            'Usuario no encontrado o inactivo'
        );
    }

    return user;
};
