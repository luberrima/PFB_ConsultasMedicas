import { selectUserDoctorByIdModel } from '../../models/users/selectUserDoctorByIdModel.js';

export const selectUserDoctorByIdService = async (id) => {
    const user = await selectUserDoctorByIdModel(id);

    if (!user) {
        throw genereErrorUtils(
            404,
            'USERDOCTOR_NOT_FOUND',
            'Doctor no encontrado o inactivo/No validado'
        );
    }

    return user;
};
