import { newConsultRecetaSchema } from '../../schemas/consultations/newConsultRecetaSchema.js';
import { newConsultTextSchema } from '../../schemas/consultations/newConsultTextSchema.js';
import { newConsultService } from '../../services/consultations/newConsultService.js';
import { newRecetaService } from '../../services/photos/newRecetaService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newConsultController = async (req, res, next) => {
	

	try {
		// 1. Obtener el id del usuario
		// const { id } = req.user;
		const userId = req.user.id;

		// 2. Obtener la info del body
		const { title, skillId, description } = req.body;
		console.log('Body', req.body);

		// 3. Obtener las fotos del body
		// const receta = req.files; // Si lo hago así estoy guardando un objeto con las recetas
		let Receta = [];
		/* if (req.files) {
			photos = Object.values(req.files);
		} */
		if (req.files) {
			console.log('req.files', req.files);
			Receta = Object.values(req.files);
		}

		// Permitimos 4 recetas como máximo
		if (Receta.length > 4) {
			throw genereErrorUtils(
				400,
				'RECIPE_LIMIT',
				'No puedes subir más de 4 recetas'
			);
		}
		// 4. Validar la info del body
		// Validar si hay datos
		await validateSchemaUtil(newConsultTextSchema, req.body);

		// 5. Validar las recetas
		Receta.length > 0 &&
			(await validateSchemaUtil(newConsultRecetaSchema, req.files));

		// 6. Crear una entrada en la base de datos
		const consult = await newConsultService({
			userId,
			title,
			skillId,
			description,
		});

		// 7. Crear las recetas en la base de datos solo si hay recetas
		let RecetaResult = [];

		if (Recetaeceta.length > 0) {
			RecetaResult = await newRecetaService(userId, consult.id, Receta);
			if (RecetaResult.affectedRows === 0) {
				throw genereErrorUtils(
					500,
					'RECIPE_NOT_CREATED',
					'No se han podido crear las recetas'
				);
			}
		}

		// 8. Responder con la entrada y las recetas creadas
		res.status(201).send({
			status: 'ok',
			message: 'Entrada creada',
			data: {
				consult: {
					...consult,
					Receta: RecetaResult,
				},
			},
		});
		// res.status(201).send('Listo');
	} catch (error) {
		next(error);
	}
};
