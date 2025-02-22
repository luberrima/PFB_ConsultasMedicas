import { validateDoctorByIdModel } from '../../models/admin/validateDoctorByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js'

export const validateDoctorByIdService = async (doctorid,validate) => {
   
    const result = await validateDoctorByIdModel(doctorid,validate);


    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'DOCTOR_NOT_EXIST',
            'El doctor ya no existe?'
        );
    }
    if (result.changedRows !== 1) {
       if (validate===1)
       {
        throw genereErrorUtils(
            404,
            'DOCTOR_ALREADY_VALIDATE',
            'El doctor ya esta validado'
        );
       }
       else
       {
        throw genereErrorUtils(
            404,
             'DOCTOR_ALREADY_BLOCKED',
            'El doctor ya no esta validado'
        );
       }
    }

 
    
   
    return  "El cambio ya esta completado";
};