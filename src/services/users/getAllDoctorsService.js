import { usersJoinDoctorsModel } from '../../models/users/usersJoinDoctorsModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getAllDoctorsService = async () => {
    const doctors = await usersJoinDoctorsModel();
    if (!doctors.length) {
        throw genereErrorUtils(
            404,
            'NO_USERS_FOUND',
            'No se han encontrado doctores'
        );
    }
    return doctors;
};
