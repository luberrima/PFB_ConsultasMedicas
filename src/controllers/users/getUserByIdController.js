import { getUserByIdService } from '../../services/users/getUserByIdService.js';

export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(id);

        delete user.password;
        delete user.registrationCode;
        delete user.recoveryPassCode;

        res.send({
            status: 'ok',
            // message: 'Usuario encontrado',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
