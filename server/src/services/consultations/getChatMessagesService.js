import { getChatMessagesModel } from '../../models/consultations/getChatMessagesModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';

export const getChatMessagesService = async (consultationId) => {
    const messages = await getChatMessagesModel(consultationId);
    
    if (!messages.length) {
        throw genereErrorUtils('No hay mensajes para esta consulta', 404);
    }

    return messages;
};