import { findReplyById } from "../../models/consultations/findReplyByIdModel.js";
import { deleteReplyById } from "../../models/consultations/deleteReplyByIdModel.js";
import { genereErrorUtils } from "../../utils/genereErrorUtils.js";

export const deleteReplyService = async (messageId, userId) => {
    const reply = await findReplyById(messageId);

    if (!reply) {
        throw genereErrorUtils("Mensaje no encontrado", 404);
    }

    if (reply.userId !== userId) {
        throw genereErrorUtils("No tienes permiso para eliminar este mensaje", 403);
    }

    await deleteReplyById(messageId);
};