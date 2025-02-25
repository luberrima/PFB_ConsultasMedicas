import { getUserByIdService } from '../../services/users/getUserByIdService.js';

export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(id);
        console.log("No estare tocando los huevos verdad?")

        res.send({
            status: 'ok',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
