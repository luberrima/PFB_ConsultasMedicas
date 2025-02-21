import { selectUserByEmailModel } from '../../models/users/selectUserbyEmailModel.js';
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
        throw genereErrorUtils(400, 'EMAIL_EXITS', 'El nombre de usuario ya existe');
    }

    const sameEmail = await selectUserByEmailModel(cleanUserInfo.email);
    if (sameEmail && sameEmail.id !== userId) {
        throw genereErrorUtils(400, 'EMAIL_EXITS', 'El correo electrónico ya existe');
    }

    const updatedUser = await updateUserProfileModel(userId, cleanUserInfo);

    return updatedUser;
};
