import { updateConsultationService } from "../../services/consultations/updateConsultationService.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import updateConsultationSchema from "../../schemas/consultations/updateConsultationSchema.js";
import { genereErrorUtils } from "../../utils/genereErrorUtils.js"; 

export async function updateConsultationController(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.auth.id;
        const updatedData = req.body;

        await validateSchemaUtil(updateConsultationSchema, updatedData);

        const updated = await updateConsultationService(id, userId, updatedData);

        if (!updated) {
            throw genereErrorUtils(400, "UPDATE_FAILED", "No se pudo actualizar la consulta.");
        }

        res.status(200).json({ message: "Consulta actualizada correctamente." });
    } catch (error) {
        next(error); 
    }
}
