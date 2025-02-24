import express from 'express';
import { usersRouter } from './usersRouter.js';

import { consultationsRouter } from './consultationsRouter.js';
import { skillsRouter } from './skillsRouter.js';
import { adminRouter } from './adminRouter.js';


export const router = express.Router();

router.use(usersRouter);
router.use(consultationsRouter);  
router.use(skillsRouter);
router.use(adminRouter);

