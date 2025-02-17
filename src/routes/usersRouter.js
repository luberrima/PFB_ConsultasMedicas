import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import {editUserPassController} from '../controllers/users/editUserPassController.js'
import { recoveryPassController } from '../controllers/users/recoveryPassController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.post('/users/send-validation-email', sendValidationEmailController);

userRouter.post('/users/password/recover', recoveryPassController);
userRouter.put('/users/password', editUserPassController);