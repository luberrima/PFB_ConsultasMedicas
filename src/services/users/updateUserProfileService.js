import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { updateUserProfileModel } from '../../models/users/updateUserProfileModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateUserProfileService = async (userId, newUserInfo) => {
    const cleanUserInfo = {
        username: newUserInfo.username ?? null,
        nombre: newUserInfo.nombre ?? null,
        email: newUserInfo.email ?? null,
        bio: newUserInfo.bio ?? null,
        collegeNumber: newUserInfo.collegeNumber ?? null,
        dateOfCollege: newUserInfo.dateOfCollege ?? null,
        skillId: newUserInfo.skillId ?? null,
    };

    const sameUsername = await selectUserByUsernameModel(cleanUserInfo.username);
    if (sameUsername && sameUsername.id !== userId) {
        throw genereErrorUtils('El nombre de usuario ya existe', 400);
    }

    const sameEmail = await selectUserByEmailModel(cleanUserInfo.email);
    if (sameEmail && sameEmail.id !== userId) {
        throw genereErrorUtils('El correo electrónico ya existe', 400);
    }

    const updatedUser = await updateUserProfileModel(userId, cleanUserInfo);

    return updatedUser;
};
