import express from 'express';

import { newConsultController } from '../controllers/consultations/newConsultController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
export const consultRouter = express.Router();

consultRouter.post('/consult',authUserMiddleware, newConsultController);