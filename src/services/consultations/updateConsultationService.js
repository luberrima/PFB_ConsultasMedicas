import updateConsultationModel from "../../models/consultations/updateConsultationModel.js";
import { genereErrorUtils } from "../../utils/genereErrorUtils.js"; //

export async function updateConsultationService(consultationId, userId, updatedData) {
    try {
        const updated = await updateConsultationModel(consultationId, userId, updatedData);

        if (!updated) {
            throw genereErrorUtils(400, "UPDATE_FAILED", "No se pudo actualizar la consulta.");
        }

        return updated;
    } catch (error) {
        throw genereErrorUtils(500, "SERVER_ERROR", error.message);
    }
}

