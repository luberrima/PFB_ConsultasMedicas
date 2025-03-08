import { getAllDoctorBySkillModel } from "../../models/consultations/getAllDoctorBySkillModel.js"
import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const getAllDoctorBySkillService  = async ()=> {
    const doctorbyskill = await getAllDoctorBySkillModel();

    if(!doctorbyskill.length) {
        throw genereErrorUtils (404, "NO_CONSULTATIONS_FOUND", "No hay doctores?");

    }
return doctorbyskill;
};