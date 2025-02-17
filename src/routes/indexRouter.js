import express from 'express';
import { usersRouter } from './usersRouter.js';
import { consulRouter } from './ConsulRouter.js';

export const router = express.Router();

router.use(usersRouter);
router.use(consulRouter);  
