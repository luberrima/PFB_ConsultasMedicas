import { deleteDiagnosticService } from '../../services/consultations/deleteDiagnosticService.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';



export const deleteDiagnistConsultController = async (req, res, next) => {

    try {

        const { id } = req.params;



        const consult = await deleteDiagnosticService(id);


        // 5. Responder al cliente
        res.status(200).send({
            status: 'Ok',
            message: 'Entrada editada',
            data: { consult },
        });
    } catch (error) {
        next(error);
    }
};