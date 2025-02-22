import {getOwnAdminService} from '../../services/admin/getOwnAdminService.js';

export const validateDoctorByIdController = async (req, res, next) => {
    try {
        const { id } = req.user;
        
        console.log("el req user id?",req);
        const admininfo = await validateDoctorByIdService(id);
     
        delete admininfo.password;
        delete userDoctor.registrationCode;
        delete userDoctor.recoveryPassCode; 

        res.send({
            status: 'ok',
            data: {
                admininfo,
            },
        });
    } catch (error) {
        next(error);
    }
};