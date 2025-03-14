import { deleteUserService } from '../../services/admin/deleteUserService.js';

export const deleteUserController = async (req, res, next) => {
    try {

        
        

        const user = req.body;

        await deleteUserService(user);

        res.send({
            status: 'ok',
            message: `El usuario con id ${user.id} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        next(error);
    }
};