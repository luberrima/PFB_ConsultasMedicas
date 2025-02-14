import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/validation-email', sendValidationEmailController);