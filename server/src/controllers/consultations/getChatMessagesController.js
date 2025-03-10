import { getChatMessagesService } from "../../services/consultations/getChatMessagesService.js";
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getChatMessagesController = async (req, res, next) => {
    try {
        const { consultationId } = req.params;
        const messages = await getChatMessagesService(consultationId);

        res.status(200).json({ status: 'ok', messages });
    } catch (error) {
        next(genereErrorUtils(error.message, 500));
    }
};