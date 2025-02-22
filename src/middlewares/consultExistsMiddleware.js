import { getConsultationByIdModel } from "../models/consultations/getConsultationByIdModel.js";



export const consultExistsMiddleware = async (req, res, next) => {
    // Tareas:
    // 1. Obtener el id de la entrada de los params
    // 2. Obtener la entrada de la base de datos.

    try {
        const { id } = req.params;
        const entry = await getConsultationByIdModel(id);

        // Adjuntar la entrada al objeto req
        req.entry = entry;
        console.log('ESTA ES LA ENTRY', entry);

        next();
    } catch (error) {
        next(error);
    }
};
