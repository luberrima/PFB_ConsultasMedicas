import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';
import { updateUserProfileController } from '../controllers/users/updateUserProfileController.js';

import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { authUser } from '../middlewares/authUserMiddleware.js';

import { updateUserProfileSchema } from '../schemas/users/updateUserProfileSchema.js';

export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.post('/users/send-validation-email', sendValidationEmailController);
usersRouter.put('/users/validate/:registrationCode', activeUserController);
usersRouter.put('/users/profile', authUser, validateSchemaMiddleware(updateUserProfileSchema), updateUserProfileController);