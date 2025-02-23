import { getConsultByIdService } from '../services/consultations/getConsultByIdService.js';

export const consultExistsMiddleware = async (req, res, next) => {
    // Tareas:
    // 1. Obtener el id de la entrada de los params
    // 2. Obtener la entrada de la base de datos.

    try {
        const { id } = req.params;
        const consult = await getConsultByIdService(id);

        // Adjuntar la entrada al objeto req
        req.consult = consult;
        console.log('ESTA ES LA ENTRY', entry);

        next();
    } catch (error) {
        next(error);
    }
};
