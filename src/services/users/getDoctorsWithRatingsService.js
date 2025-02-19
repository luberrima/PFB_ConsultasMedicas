import { getDoctorsWithRatingsModel } from '../../models/users/getDoctorsWithRatingsModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getDoctorsWithRatingsService = async () => {
    const doctors = await getDoctorsWithRatingsModel();
    if (!doctors.length) {
        throw genereErrorUtils(
            404,
            'NO_USERS_FOUND',
            'No se han encontrado doctores'
        );
    }
    return doctors;
};
