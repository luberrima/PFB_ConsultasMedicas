import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.post('/users/send-validation-email', sendValidationEmailController);import express from 'express';
import { loginUserController } from '../controllers/users/loginUserController.js';

export const usersRouter = express.Router();

usersRouter.post('users/login', loginUserController);
