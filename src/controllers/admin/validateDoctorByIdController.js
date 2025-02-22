import {validateDoctorByIdService} from '../../services/admin/validateDoctorByIdService.js';

export const validateDoctorByIdController = async (req, res, next) => {
    try {
        const { doctorId,validate } = req.body;
        
        console.log("el req user id?",req.body);
        const admininfo = await validateDoctorByIdService(doctorId,validate);
     
     

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