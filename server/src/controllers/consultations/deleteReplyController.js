import { deleteReplyService } from "../../services/consultations/deleteReplyService.js";

export const deleteReplyController = async (req, res, next) => {
    try {
        console.log("entro en el controlador")
        const { replyId } = req.params;
        const { id: userId } = req.user; // ID del usuario autenticado
        console.log("recibo estos datos:", replyId, userId)
        await deleteReplyService(replyId, userId);

        res.status(200).json({ status: "ok", message: "Mensaje eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
