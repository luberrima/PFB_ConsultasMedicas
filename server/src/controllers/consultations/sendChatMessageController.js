import { sendChatMessageService } from "../../services/consultations/sendChatMessageService.js";
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const sendChatMessageController = async (req, res, next) => {
    try {
        const { consultationId } = req.params;
        const { message } = req.body;
        const userId = req.user.id;

        const sentMessage = await sendChatMessageService(consultationId, message, userId);

        res.status(201).json({ status: 'ok', message: sentMessage });
    } catch (error) {
        next(genereErrorUtils(error.message, 500));
    }
};