import { newConsultRecetaSchema } from '../../schemas/consultations/newConsultRecetaSchema.js';
import { newConsultTextSchema } from '../../schemas/consultations/newConsultTextSchema.js';
import { newConsultService } from '../../services/consultations/newConsultService.js';
import { newRecetaService } from '../../services/photos/newRecetaService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newConsultController = async (req, res, next) => {


    try {
        // Obtener el id del usuario

        const userId = req.user.id;

        //  Obtener la info del body
        const { title, skillId, description,gravedad,doctorId } = req.body;
        

        //  Obtener las recetas

        let Receta = [];

        if (req.files) {
          
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

        // Validar si hay datos (info)
        await validateSchemaUtil(newConsultTextSchema, req.body);

        // Validar las recetas
        //Receta.length > 0 &&
        //    (await validateSchemaUtil(newConsultRecetaSchema, req.files));

        // Crear una entrada
        const consult = await newConsultService({
            userId,
            title,
            skillId,
            description,
            gravedad,
            doctorId,
        });
       

        // Crear las recetas en la base de datos solo si hay 
        let RecetaResult = [];

        if (Receta.length > 0) {
            RecetaResult = await newRecetaService(userId, consult.id, Receta);
            if (RecetaResult.affectedRows === 0) {
                throw genereErrorUtils(
                    500,
                    'RECIPE_NOT_CREATED',
                    'No se han podido crear las recetas'
                );
            }
        }

        // Responder 

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

    } catch (error) {
        next(error);
    }
};