import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getUserByIdService = async (id) => {
    const user = await selectUserByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USER_NOT_FOUND',
            'Usuario no encontrado o inactivo'
        );
    }

    return user;
};
