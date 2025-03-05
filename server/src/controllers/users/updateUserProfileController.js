import { updateUserService } from '../../services/users/updateUserProfileService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserController = async (req, res) => {
    const { id } = req.user; // Obtener el id del usuario desde el JWT
    const { username, nombre, email, avatar, bio, active } = req.body; // Datos del cuerpo de la solicitud

    if (!id) {
        // Si el id no está presente, generamos un error
        const error = genereErrorUtils(400, 'MISSING_ID', 'El id del usuario es obligatorio');
        return res.status(error.httpStatus).json({ code: error.code, message: error.message });
    }

    try {
        // Preparar los datos a actualizar
        const updatedUser = {
            username,
            nombre,
            email,
            avatar,
            bio,
            active
        };

        // Llamar al servicio de actualización
        await updateUserService(id, updatedUser);

        return res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el usuario', error);

        // Aquí, utilizamos `genereErrorUtils` para enviar el error con un formato homogéneo
        const status = error.httpStatus || 500;
        const code = error.code || 'USER_UPDATE_FAILED';
        const message = error.message || 'Error interno del servidor';

        return res.status(status).json({ code, message });
    }
};
