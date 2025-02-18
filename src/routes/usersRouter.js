import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
/*import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';*/
import { loginUserController } from '../controllers/users/loginUserController.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'; // Corrección en la importación

export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
/* usersRouter.post('/users/send-validation-email', sendValidationEmailController);  Falta el archivo utils sendEmailBrevoUtil.js  */ 

// Ruta para subir archivos
usersRouter.post("/users/upload", uploadMiddleware, (req, res) => {
    res.json({ message: "Archivo subido correctamente", filePath: req.filePath });
});
