import {selectUserDoctorByIdService} from '../../services/users/selectUserDoctorByIdService.js';

export const getUserDoctorByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        

        const userDoctor = await selectUserDoctorByIdService(id);
     
        delete userDoctor.password;
        delete userDoctor.registrationCode;
        delete userDoctor.recoveryPassCode;

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