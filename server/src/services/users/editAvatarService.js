
import path from 'path';
import { editAvatarModel } from '../../models/users/editAvatarModel.js'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { saveRecetaUtil,deleteRecetaUtil } from '../../utils/recetaUtils.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const editAvatarService = async (id,avatar) => {

     const user= await selectUserByIdModel(id);
    
    if (!user) {
        throw genereErrorUtils(400, 'USER_NOT_FOUND', 'El usuario no existe');
    }


    const userRelativePath = `src/uploads/avatars/${id}`;

    const avatarName = await saveRecetaUtil(userRelativePath, avatar, 200);

    if (user.avatar) {
		const avatarPath = path.join(process.cwd(), userRelativePath, user.avatar);
		await deleteRecetaUtil(avatarPath);
	}


   

    const result = await editAvatarModel(id, avatarName);
	if (result.affectedRows !== 1) {
		throw genereErrorUtils(
			500,
			'UPDATE_AVATAR_ERROR',
			'No se ha podido actualizar el avatar'
		);
	}
    return `Avatar Actualizado del user ${id}`;
};
