import { takeEmpyConsultationService } from "../../services/consultations/takeEmpyConsultationService.js";



export const takeEmpyConsultationController = async (req, res, next) => {

    try {

        const { consultationId } = req.params;
        const { id } =req.user;
        



        const consult = await takeEmpyConsultationService(id,consultationId);

        res.status(200).send({
            status: 'Ok',
            message: 'Entrada editada',
            data: { consult },
        });
    } catch (error) {
        next(error);
    }
};