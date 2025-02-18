import express from 'express';
 import { usersRouter } from './usersRouter.js';
import { consultRouter } from './consultRouter.js';

export const router = express.Router();

 router.use(usersRouter);
router.use(consultRouter);  
