import { selectUserByRolesModel } from '../../models/admin/selectUserByRoleModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js'

export const getOwnAdminService = async (id) => {
   
    const admin = await selectUserByIdModel(id);

    if (!admin) {
        throw genereErrorUtils(
            404,
            'ADMIN_NOT_FOUND',
            'ADMIN no encontrado o inactivo/No validado'
        );
    }
    if (admin.role!=="admin"){
        throw genereErrorUtils(
            404,
            'INVALID_ROLE_USER',
            'Esta seccion es solo para administrador'
        );
    }
     
    const users = await selectUserByRolesModel("paciente");

    const doctor =await selectUserByRolesModel("doctor");

    
    admin.users=users;
    admin.doctor=doctor;
   
   
    
   
    return  admin;
};