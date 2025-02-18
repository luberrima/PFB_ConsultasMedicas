import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
/*import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';*/
import { loginUserController } from '../controllers/users/loginUserController.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js'; // Corrección en la importación
import editUserPassController from '../controllers/users/editUserPassController.js' //Si usas un export default no necesitas llaves.
/*import { recoveryPassController } from '../controllers/users/recoveryPassController.js';   servidor indica que falta PFB_ConsultasMedicas\src\models\users\updateRecoverPassModel.js*/
import { loginUserController } from '../controllers/users/loginUserController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
usersRouter.post('/users/login', loginUserController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
/* usersRouter.post('/users/send-validation-email', sendValidationEmailController);

userRouter.post('/users/password/recover', recoveryPassController);
userRouter.put('/users/password', editUserPassController);  Falta el archivo utils sendEmailBrevoUtil.js  */ 

// Ruta para subir archivos
usersRouter.post("/users/upload", uploadMiddleware, (req, res) => {
    res.json({ message: "Archivo subido correctamente", filePath: req.filePath });
});

usersRouter.put('/users/validate/:registrationCode', activeUserController);