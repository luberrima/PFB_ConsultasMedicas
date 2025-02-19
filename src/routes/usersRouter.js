import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { getDoctorsWithRatingsController } from '../controllers/users/getDoctorsWithRatingsController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import editUserPassController from '../controllers/users/editUserPassController.js' //Si usas un export default no necesitas llaves.
import { recoveryPassController } from '../controllers/users/recoveryPassController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';
import { updateUserProfileController } from '../controllers/users/updateUserProfileController.js';
import { getUserDoctorByIdController } from '../controllers/users/getUserDoctorByIdController.js'

import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'; // Corrección en la importación
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';

import { updateUserProfileSchema } from '../schemas/users/updateUserProfileSchema.js';


export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
usersRouter.get('/users/doctors/:id', getUserDoctorByIdController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);

usersRouter.get('/users/doctors', getDoctorsWithRatingsController);

usersRouter.put('/users/active/:registrationCode', activeUserController);
usersRouter.put('/users/updateprofile', authUserMiddleware, validateSchemaMiddleware(updateUserProfileSchema), updateUserProfileController);
usersRouter.put('/users/send-validation-email', sendValidationEmailController);

usersRouter.post('/users/password/recover', recoveryPassController);
usersRouter.put('/users/password', editUserPassController);

// Ruta para subir archivos
usersRouter.post('/users/upload', uploadMiddleware, (req, res) => {
    res.json({ message: "Archivo subido correctamente", filePath: req.filePath });
});

