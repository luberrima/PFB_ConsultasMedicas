import { selectUserConsultModel } from '../../models/users/selectUserConsultModel.js';
import { getConsultationByUserIDModel } from '../../models/consultations/getConsultationByUserIDModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getOwnUserService = async (id) => {

    const user = await selectUserConsultModel(id);

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
    
    data.user=user;

   

    return data;
};
