

import { updateDiagConsultByIdModel } from '../../models/consultations/updateDiagConsultByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const updateDiagnosticService = async (diagnostic, id) => {

    
    const result = await updateDiagConsultByIdModel(diagnostic, id );

    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            404,
            'ENTRY_NOT_UPDATED',
            'No se ha podido editar el diganostico'
        );
    }

    
    return result;
};