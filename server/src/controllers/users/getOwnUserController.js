import { getOwnUserService } from '../../services/users/getOwnUserService.js';

export const getOwnUserController = async (req, res, next) => {
    try {
        const user = await getOwnUserService(req.user.id);

        delete user.user[0].password;
        delete user.user[0].registrationCode;
        delete user.user[0].recoveryPassCode;

       

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
