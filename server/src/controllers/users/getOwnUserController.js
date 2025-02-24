import { getOwnUserService } from '../../services/users/getOwnUserService.js';

export const getOwnUserController = async (req, res, next) => {
    try {
        const user = await getOwnUserService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};
