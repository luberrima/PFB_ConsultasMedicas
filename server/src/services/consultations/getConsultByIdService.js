import { selectConsultByIdModel } from '../../models/consultations/selectConsultByIdModel.js';
import { selectPhotoByIdModel } from '../../models/photos/selectPhotoByIdModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getConsultByIdService = async (id) => {
    // Obtener la entrada de la base de datos.Lo va a hacer el modelo. Si no existe, devolver un error
    console.log('QUE TENGO COMO ID EN EL SERVIDE CE LA CONSUTA', id); 

    const consulta = await selectConsultByIdModel(id);
    console.log('QUE TENGO EN EL SERVIDE CE LA CONSUTA', consulta ); 

    if (!consulta) {
        throw genereErrorUtils(
            404,
            'CONSULT_NOT_FOUND',
            'No se ha encontrado la Consulta'
        );
    }

    const documents = await selectPhotoByIdModel(id);
    consulta.documents = documents;

    return consulta;
};
