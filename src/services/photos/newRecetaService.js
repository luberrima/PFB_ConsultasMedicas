import path from 'path';
import crypto from 'crypto';

import { insertRecetaModel } from '../../models/photos/insertPhotoModel.js';
import { genereErrorUtils } from '../../utils/helpersUtils.js';
import { saveRecetaUtil } from '../../utils/recetaUtils.js';

export const newRecetaService = async (userId, recetaId, arch) => {
	// Crear un array para almacenar los resultados de cada foto procesada
	const processedarch = [];

	// Crear el path relativo donde se guardarán las fotos
	// const photosRelativePath = `src/uploads/entries/${userId}/${entryId}`;
	const archRelativePath = path.join('src/uploads/entries', userId, recetaId);

	for (const arch of arch) {
		// 1. Generar un ID único para la foto
		const recetaId = crypto.randomUUID();

		// 2. Guardar la foto en el sistema de archivos
		const recetaName = await saveRecetaUtil(recetaRelativePath, arch, 800);

		// 3. Guardar la información de la foto en la base de datos
		const result = await insertRecetaModel(recetaId, ConsultId, recetaName);

		// Si no se pudo insertar la foto en la base de datos, lanzar un error
		if (result.affectedRows !== 1) {
			throw genereErrorUtils(
				500,
				'RECIPE_NOT_SAVED',
				'No se ha podido guardar la receta en la base de datos'
			);
		}

		// Agregar la información de la foto procesada al array
		processedRecetas.push({
			id: recetaId,
			recetaName,
			consultId,
		});
	}

	// Devolver la lista de recetas
	return processedRecetas;
};
