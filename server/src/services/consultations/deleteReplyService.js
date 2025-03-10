import { findReplyById } from "../../models/consultations/findReplyByIdModel.js";
import { deleteReplyById } from "../../models/consultations/deleteReplyByIdModel.js";
import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const deleteReplyService = async (replyId, userId) => {
    console.log("entro en el service")
    const reply = await findReplyById(replyId);

    if (!reply) {
        throw genereErrorUtils("Mensaje no encontrado", 404);
    }

    if (reply.userId !== userId) {
        throw genereErrorUtils("No tienes permiso para eliminar este mensaje", 403);
    }

    await deleteReplyById(replyId);
};