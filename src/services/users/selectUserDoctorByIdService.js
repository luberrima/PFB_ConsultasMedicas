import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';
import { selectAverageVoteByDoctorIdModel } from '../../models/votes/selectAverageVoteByDoctorIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const selectUserDoctorByIdService = async (id) => {
    const user = await selectUserDoctorByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USERDOCTOR_NOT_FOUND',
            'Doctor no encontrado o inactivo/No validado'
        );
    }

    const votes = await selectAverageVoteByDoctorIdModel(id);
    let doctoruser = { ...user }

    if (votes.ConsultasTotales===0) {


        doctoruser.status = "No evaluado";
    }
    else {
        doctoruser = { ...user, ...votes }

    }



    return doctoruser;
};
