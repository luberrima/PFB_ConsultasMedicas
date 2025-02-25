import { getAllConsultationService } from "../../services/consultations/getAllConsultationService.js"

export const getAllConsultationController = async (req, res, next)=> {
try {

    // pasar a getAllConsultationService id usuario y role (estan en req.user)
    const consultations = await getAllConsultationService(req.user.id, req.user.role);
  
    res.status(200).send({
        status: 'ok',
        message: 'lista de consultas',
        data: { asignadas: [],
          noasignadas: [],
          resueltas: []
         },
    });
} catch (error) {
  next(error);  
}

}