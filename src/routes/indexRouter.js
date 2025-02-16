import express from 'express';
import { usersRouter } from './usersRouter.js';
import { consultationsRouter } from './consultationsRouter.js';

export const router = express.Router();

router.use(usersRouter);
router.use(consultationsRouter);
