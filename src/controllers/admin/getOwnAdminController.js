
import {getOwnAdminService} from '../../services/admin/getOwnAdminService.js';

export const getOwnAdminController = async (req, res, next) => {
    try {
        const { id } = req.user;
        
        console.log("el req user id?",id);
        const admininfo = await getOwnAdminService(id);
     
        delete admininfo.password;
        delete admininfo.registrationCode;
        delete admininfo.recoveryPassCode; 

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