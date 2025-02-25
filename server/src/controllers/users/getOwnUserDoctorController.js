import {getOwnUserDoctorService} from '../../services/users/getOwnUserDoctorService.js';

export const getOwnUserDoctorController = async (req, res, next) => {
    try {
        const { id } = req.user;
        
    
        const userDoctor = await getOwnUserDoctorService(id);
     
        delete userDoctor.user[0].password;
        delete userDoctor.user[0].registrationCode;
        delete userDoctor.user[0].recoveryPassCode;

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