import { getConsultationBySkillModel } from "../../models/consultations/getConsultationBySkillModel.js"
import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const getConsultationBySkillService = async ( skillId)=> {
    const consultations = await getConsultationBySkillModel( skillId);

    if(!consultations.length) {
        throw genereErrorUtils (404, "NO_CONSULTATIONS_FOUND", "No se han encontrado consultas");

    }
return consultations;
};
