import crypto from 'crypto';

import { insertConsultModel } from '../../models/consultations/insertConsultModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const newConsultService = async (consult) => {

    // Crear la id 
    const id = crypto.randomUUID();

    // Crear entrada 
    const result = await insertConsultModel({
        id,
        ...consult,
    });

    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            500,
            'ENTRY_NOT_CREATED',
            'No se ha podido crear la entrada'
        );
    }

    // Mando la entrada
    return {
        id,
        ...consult,
    };
};