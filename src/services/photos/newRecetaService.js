import path from 'path';
import crypto from 'crypto';

import { insertRecetaModel } from '../../models/consultations/insertRecetaModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { saveRecetaUtil } from '../../utils/recetaUtils.js';

export const newRecetaService = async (userId, recetaId, arch) => {

    const processedarch = [];


    const archRelativePath = path.join('src/uploads/entries', userId, recetaId);

    for (const arch of arch) {
        // Generar un ID único 
        const recetaId = crypto.randomUUID();

        //  Guardar la receta
        const recetaName = await saveRecetaUtil(archRelativePath, arch, 800);

        // Guardar la información 
        const result = await insertRecetaModel(recetaId, ConsultId, recetaName);

        // Si no se pudo insertar 
        if (result.affectedRows !== 1) {
            throw genereErrorUtils(
                500,
                'RECIPE_NOT_SAVED',
                'No se ha podido guardar la receta en la base de datos'
            );
        }

        // Agregar la información  al array
        processedRecetas.push({
            id: recetaId,
            recetaName,
            consultId,
        });
    }

    // Devolver la lista de recetas
    return processedRecetas;
};