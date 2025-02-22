import { getConsultationByIddoctorModel } from '../../models/consultations/getConsultationByIdDoctorModel.js';
import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';
import { selectAverageVoteByDoctorIdModel } from '../../models/votes/selectAverageVoteByDoctorIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getOwnUserDoctorService = async (id) => {
    const user = await selectUserDoctorByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            401,
            'USERDOCTOR_NOT_FOUND',
            'Doctor no encontrado o inactivo/No validado'
        );
    }
    if (user.role !== 'doctor') {
        throw genereErrorUtils(
            401,
            'INVALID_ROLE_USER',
            'Esta seccion es solo para doctores'
        );
    }

    const votes = await selectAverageVoteByDoctorIdModel(id);

    const consult = await getConsultationByIddoctorModel(id);

    let doctoruser = { ...user };

    if (votes.ConsultasTotales === 0) {
        doctoruser.status = 'No evaluado';
    } else {
        doctoruser = { ...user, ...votes };
    }
    if (!consult) {
        doctoruser.consult = 'Vacio';
    } else {
        doctoruser = { ...user, ...votes };
        doctoruser.consult = consult;
    }
    console.log('valor de consult', consult);
    console.log('valor de votes', votes);

    return doctoruser;
};
