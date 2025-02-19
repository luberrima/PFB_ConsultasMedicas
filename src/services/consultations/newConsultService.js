import crypto from 'crypto';

import { insertConsultModel } from '../../models/consultations/insertConsultModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const newConsultService = async (consult) => {
	
	// 1. Crear la id de la entrada con crypto.randomUUID()
	const id = crypto.randomUUID();

	// 2. Crear una entrada en la base de datos
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

	// 3. Devolver la entrada creada
	return {
		id,
		...consult,
	};
};
