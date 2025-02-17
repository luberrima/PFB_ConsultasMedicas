import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import { getAllDoctorsController } from '../controllers/users/getAllDoctorsController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.post('/users/send-validation-email', sendValidationEmailController);
usersRouter.post('/users/doctors', getAllDoctorsController);
