import {  selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { editDoctorUserInfoModel } from '../../models/users/editDoctorUserInfoModel.js' 
import { editUserInfoModel } from '../../models/users/editUserInfoModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const editUserInfoService = async (id,nombre,  bio, collegeNumber,  dateOfCollege) => {


    const user= await selectUserByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USER_NOT_FOUND',
            'Usuario no encontrado o inactivo'
        );
    }

    const resultuser = await editUserInfoModel(id, nombre,  bio);


    if (resultuser.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'ERROR_UPDATE_USER',
            'No se pudo actualizar la informacion del usuario'
        );
    }

    if (user.role==="doctor")
    {
       
     const resultdoctor= await editDoctorUserInfoModel(id, collegeNumber,  dateOfCollege)
 

     if (resultdoctor.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'ERROR_UPDATE_DOCTOR',
            'No se pudo actualizar la informacion del Doctor'
        );
    }

    }


  

    return "Todo los datos han sido actualizado";
};
