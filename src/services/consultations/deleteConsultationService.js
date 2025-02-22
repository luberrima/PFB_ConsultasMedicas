import { relative } from 'path';
import { deletePathUtil } from '../../utils/foldersUtils.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { deleteConsultationByIdModel } from '../../models/consultations/deleteConsultationByIdModel.js';

export const deleteConsultationService = async (consultation) => {
    const result = await deleteConsultationByIdModel(consultation.id);
    if (result.affectedRows === 0) {
        throw genereErrorUtils(
            500,
            'DELETE_CONSULT_ERROR',
            'No se ha podido borrar la consulta'
        );
    }
    console.log('Esto es lo que devuelve el result del service', result);
    return result;
};
