import { updateDiagnosticService } from "../../services/consultations/updateDiagnosticService.js";



export const editDiagnistConsultController = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { diagnostic } = req.body;

        const consult = await updateDiagnosticService(diagnostic, id);

        res.status(200).send({
            status: 'Ok',
            message: 'Entrada editada',
            data: { consult },
        });
    } catch (error) {
        next(error);
    }
};