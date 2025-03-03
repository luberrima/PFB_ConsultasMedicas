import {getOwnUserDoctorService} from '../../services/users/getOwnUserDoctorService.js';

export const getOwnUserDoctorController = async (req, res, next) => {
    try {
        const { id } = req.user;
        
    
        const userDoctor = await getOwnUserDoctorService(id);
     
        delete userDoctor.user.password;
        delete userDoctor.user.registrationCode;
        delete userDoctor.user.recoveryPassCode;

        res.send({
            status: 'ok',
            data: {
                userDoctor,
            },
        });
    } catch (error) {
        next(error);
    }
};
