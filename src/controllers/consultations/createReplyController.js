import { createReplyService } from '../../services/consultations/createReplyService.js';
import { newRecetaService } from '../../services/photos/newRecetaService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const createReplyController = async (req, res, next) => {
    try {
        const { consultationId } = req.body;
        const { reply } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;
        const userSkillId = req.user.skillId || null;

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
               /*  await validateSchemaUtil(newConsultTextSchema, req.body); */





        const newReply = await createReplyService({ consultationId, reply, userId, userRole, userSkillId });

       

        // Crear las recetas en la base de datos solo si hay 
        let RecetaResult = [];

        if (Receta.length > 0) {
            RecetaResult = await newRecetaService(userId, consultationId, Receta, newReply);
            if (RecetaResult.affectedRows === 0) {
                throw genereErrorUtils(
                    500,
                    'RECIPE_NOT_CREATED',
                    'No se han podido crear las recetas'
                );
            }
        }



        res.status(201).send({
            status: 'ok',
            message: 'Respuesta creada correctamente',
            data: {
               newReply: {newReply, Receta: RecetaResult, 

               },
            },
        });
    } catch (error) {
        next(error);
    }
};