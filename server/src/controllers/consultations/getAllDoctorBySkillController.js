import { getAllDoctorBySkillService } from "../../services/consultations/getAllDoctorBySkillService.js"

export const  getAllDoctorBySkillController = async (req, res, next)=> {
try {
    const doctorskill = await getAllDoctorBySkillService();
    res.status(200).send({
        status: 'ok',
        message: 'lista de consultas',
        data: { doctorskill },
    });
} catch (error) {
  next(error);  
}

}