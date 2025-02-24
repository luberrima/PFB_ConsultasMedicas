import { getAllConsultationModel } from "../../models/consultations/getAllConsultationModel.js"
import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const getAllConsultationService = async ()=> {
    const consultations = await getAllConsultationModel();

    if(!consultations.length) {
        throw genereErrorUtils (404, "NO_CONSULTATIONS_FOUND", "No se han encontrado consultas");

    }
return consultations;
};
