import { deleteReplyService } from "../../services/consultations/deleteReplyService.js";

export const deleteReplyController = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        const { id: userId } = req.user; // ID del usuario autenticado

        await deleteReplyService(messageId, userId);

        res.status(200).json({ status: "ok", message: "Mensaje eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
