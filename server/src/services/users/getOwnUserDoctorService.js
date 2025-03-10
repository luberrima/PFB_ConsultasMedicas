import { getConsultationByUserIDModel } from '../../models/consultations/getConsultationByUserIDModel.js';
import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';
import { selectAverageVoteByDoctorIdModel } from '../../models/votes/selectAverageVoteByDoctorIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getOwnUserDoctorService = async (id) => {
    const user = await selectUserDoctorByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USER_NOT_FOUND',
            'Usuario no encontrado o inactivo'
        );
    }


    const consult = await getConsultationByUserIDModel(id);
    const data={};

    if (!consult) {
        data.consult = 'Vacio';
    } else {
        
        data.consult = consult;
    }
    
  

   
   
  

    const votes = await selectAverageVoteByDoctorIdModel(id);
   

   Object.assign(user[0],votes);
   data.user=user;
   

    




    return data;
};
