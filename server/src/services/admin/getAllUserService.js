import { getAllUserModel } from '../../models/admin/getAllUserModel.js';

import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getAllUserService = async () => {
    const users = await getAllUserModel();

    if (!users.length) {
        throw genereErrorUtils(
            404,
            'NO_USER_FOUND',
            'No se han encontrado Usuarios'
        );
    }
    return users;
};
