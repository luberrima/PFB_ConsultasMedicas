import express from 'express';
import { getAllskillsController } from '../controllers/users/getAllskillsController.js';


export const skillsRouter = express.Router();


skillsRouter.get('/skills', getAllskillsController);