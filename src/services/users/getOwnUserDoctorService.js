import { getConsultationByIddoctorModel } from '../../models/consultations/getConsultationByIdDoctorModel.js';
import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';
import { selectAverageVoteByDoctorIdModel } from '../../models/votes/selectAverageVoteByDoctorIdModel.js';

export const getOwnUserDoctorService = async (id) => {
   /*
    const user = await selectUserDoctorByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USERDOCTOR_NOT_FOUND',
            'Doctor no encontrado o inactivo/No validado'
        );
    }
     
    const votes = await selectAverageVoteByDoctorIdModel(id);

    const consult =await getConsultationByIddoctorModel(id);


    let doctoruser={...user }

    if (!votes) {

        
        doctoruser.status="No evaluado";
    }
    else
    {
      doctoruser={...user, ...votes }

    }
    
    doctoruser.consult=consult;*/
    
    let doctoruser={}
    return doctoruser;
};
