
import { removeDiagConsultByIdModel } from '../../models/consultations/removeDiagConsultByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const deleteDiagnosticService = async (id) => {

    // 1. Editar la entrada
    const result = await removeDiagConsultByIdModel(id);

    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'ENTRY_NOT_UPDATED',
            'No se ha podido borrar el diganostico'
        );
    }

    // 2. Devolver la entrada
    return result;
};