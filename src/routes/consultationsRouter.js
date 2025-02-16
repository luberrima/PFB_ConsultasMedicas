import express from 'express';
import { getConsultationDetailController } from '../controllers/consultations/getConsultationDetailController.js';

export const consultationsRouter = express.Router();

consultationsRouter.get('/consultations/:consultationId', getConsultationDetailController);