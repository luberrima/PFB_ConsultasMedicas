import path from 'path';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { deleteUserByIdModel } from '../../models/admin/deleteUserByIdModel.js';
import { UPLOADS_DIR, AVATARDIR} from '../../../env.js';
import { deletePathUtil } from '../../utils/foldersUtils.js';
import { getConsultationByUserIDModel } from '../../models/consultations/getConsultationByUserIDModel.js';
import { deletePhotoModel } from '../../models/photos/deletePhotoModel.js';
import { deleteConsultationAllByIdModel } from '../../models/consultations/deleteconsultationAllByIdModel.js';
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

export const deleteUserService = async (user) => {

    const userFull = await selectUserByIdModel(user.id)
    //si es doctor no borramos consultas a las que pertenece solo sus datos

    if (userFull.role === 'doctor') {
        
        const result = await deleteUserByIdModel(user.id);
        if (result.affectedRows === 0) {
            throw genereErrorUtils(
                500,
                'DELETE_USER_ERROR',
                'No se ha podido borrar el usuario'
            );
        } 
        
        const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
        const avatarsDir = path.join(uploadsDir, AVATARDIR, user.id);
        const entriesDir = path.join(uploadsDir, 'entries', user.id);
        await deletePathUtil(avatarsDir);
        await deletePathUtil(entriesDir);

        return result; 
    }


    
   
    
    const consults = await getConsultationByUserIDModel(user.id);
    console.log('QUE TENEMOS COMO USER',user);
    
   

    if (consults.length>0) {

        for (const consult of consults) {
                
            const consultDelete = await deletePhotoModel(consult.id);
        
        }
        const consulalldelete = await deleteConsultationAllByIdModel(user.id);

        if (consulalldelete.affectedRows === 0) {
            throw genereErrorUtils(
                500,
                'DELETE_CONSULT_ERROR',
                'No se han podido borrar las consultas'
            );
        };
    }
      const result = await deleteUserByIdModel(user.id);
    if (result.affectedRows === 0) {
        throw genereErrorUtils(
            500,
            'DELETE_CONSULT_ERROR',
            'No se ha podido borrar la consulta'
        );
    } 
    const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
    const avatarsDir = path.join(uploadsDir,AVATARDIR,user.id);
    const entriesDir = path.join(uploadsDir, 'entries',user.id);
    await deletePathUtil(avatarsDir);
    await deletePathUtil(entriesDir);

    return result;
};