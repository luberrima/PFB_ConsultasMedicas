import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'; // Corrección en la importación
import { editUserPassController } from '../controllers/users/editUserPassController.js'; //Si usas un export default no necesitas llaves.
import { recoveryPassController } from '../controllers/users/recoveryPassController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { sendRecoveryPassController } from '../controllers/users/sendRecoveryPassController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.put('/users/validate/:registrationCode', activeUserController);
usersRouter.post('/users/send-validation-email', sendValidationEmailController);
usersRouter.post('/users/password/recovery', sendRecoveryPassController);
usersRouter.put('/users/password', editUserPassController);
// Ruta para subir archivos
usersRouter.post('/users/upload', uploadMiddleware, (req, res) => {
    res.json({
        message: 'Archivo subido correctamente',
        filePath: req.filePath,
    });
});
