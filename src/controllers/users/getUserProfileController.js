import {selectUserByIdModel} from '../../models/users/selectUserByIdModel.js';

export const getUserProfileController = async (req, res, next) => {
    try {
        const { userid } = req.params;

        const user = await selectUserByIdModel(userId);

        delete user.password;
        delete user.registrationCode;
        delete user. recoveryPassCode;

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};