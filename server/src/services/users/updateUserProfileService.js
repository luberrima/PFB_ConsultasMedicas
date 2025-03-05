import { getUserById, updateUser } from '../../models/users/updateUserProfileModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserService = async (id, userData) => {
    // Verificar si el usuario existe
    const user = await getUserById(id);
    if (!user) {
        throw genereErrorUtils(404, 'USER_NOT_FOUND', 'Usuario no encontrado');
    }

    // Actualizar los datos del usuario
    const success = await updateUser(id, userData);
    if (!success) {
        throw genereErrorUtils(500, 'USER_UPDATE_FAILED', 'No se pudo actualizar el usuario');
    }

    return success;
};