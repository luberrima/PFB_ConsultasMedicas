import { getAllConsultationService } from "../../services/consultations/getAllConsultationService.js"

export const getAllConsultationController = async (req, res, next)=> {
try {
    const consultations = await getAllConsultationService();
    res.status(200).send({
        status: 'ok',
        message: 'lista de consultas',
        data: { consultations },
    });
} catch (error) {
  next(error);  
}

}