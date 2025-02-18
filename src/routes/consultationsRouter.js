import express from 'express';
import { getConsultationDetailController } from '../controllers/consultations/getConsultationDetailController.js';
import { createReplyController } from '../controllers/consultations/createReplyController.js';
import { authUser } from '../middlewares/authUserMiddleware.js'
import { voteDoctorController } from '../controllers/consultations/voteDoctorController.js';

export const consultationsRouter = express.Router();

consultationsRouter.get('/consultations/:consultationId', authUser, getConsultationDetailController);
consultationsRouter.post('/consultations/:consultationId/replies', authUser, createReplyController);
consultationsRouter.post('/consultations/:id/vote', authUser, voteDoctorController);