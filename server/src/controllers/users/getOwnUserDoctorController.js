import {getOwnUserDoctorService} from '../../services/users/getOwnUserDoctorService.js';

export const getOwnUserDoctorController = async (req, res, next) => {
    try {
        const { id } = req.user;
        
    
        const user = await getOwnUserDoctorService(id);

        
     
        delete user.user[0].password;
        delete user.user[0].registrationCode;
        delete user.user[0].recoveryPassCode;

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
