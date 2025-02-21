

import {getOwnUserDoctorService} from '../../services/users/getOwnUserDoctorService.js';

export const getOwnUserDoctorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        console.log(res);
        const userDoctor = await getOwnUserDoctorService(id);
     
        delete userDoctor.password;
       /* delete userDoctor.registrationCode;
        delete userDoctor.recoveryPassCode;*/

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