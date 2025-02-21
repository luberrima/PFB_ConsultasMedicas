
import { selectconsultByIdModel } from '../../models/consultations/selectconsultByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';



export const getConsultByIdService = async (id) => {

    // Obtener la entrada de la base de datos.Lo va a hacer el modelo. Si no existe, devolver un error

    const consulta = await selectconsultByIdModel(id);

    if (!consulta) {
        throw genereErrorUtils(
            404,
            'CONSULT_NOT_FOUND',
            'No se ha encontrado la Consulta'
        );
    }

    return consulta;
};
