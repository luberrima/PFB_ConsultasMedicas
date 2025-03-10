import { sendChatMessageModel } from '../../models/consultations/sendChatMessageModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import crypto from 'crypto';

export const sendChatMessageService = async (consultationId, reply, userId) => {
    const replyId = crypto.randomUUID();
    
    const result = await sendChatMessageModel(replyId, reply, consultationId, userId);

    if (!result.affectedRows) {
        throw genereErrorUtils('Error al enviar el mensaje', 500);
    }

    return {
        id: replyId,
        reply,
        userId,
        consultationId,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };
};