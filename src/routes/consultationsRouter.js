import express from 'express';
import { getConsultationDetailController } from '../controllers/consultations/getConsultationDetailController.js';
import { createReplyController } from '../controllers/consultations/createReplyController.js';

export const consultationsRouter = express.Router();

consultationsRouter.get('/consultations/:consultationId', getConsultationDetailController);
consultationsRouter.post('/consultations/:consultationId/replies', createReplyController);