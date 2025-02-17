import { selectUsersbyRoleModel } from '../../models/users/selectUsersbyRoleModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getAllDoctorsService = async () => {
    const doctors = await selectUsersbyRoleModel({ role: 'doctor' });
    if (!doctors.length) {
        throw genereErrorUtils(
            404,
            'NO_USERS_FOUND',
            'No se han encontrado doctores'
        );
    }
    return doctors;
};
