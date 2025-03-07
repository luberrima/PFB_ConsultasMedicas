import express from 'express';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { registerDoctorController } from '../controllers/users/registerDoctorController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { getDoctorsWithRatingsController } from '../controllers/users/getDoctorsWithRatingsController.js';
import { sendValidationEmailController } from '../controllers/users/sendValidationEmailController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { editUserPassController } from '../controllers/users/editUserPassController.js';
import { recoveryPassController } from '../controllers/users/recoveryPassController.js';
import { activeUserController } from '../controllers/users/activeUserController.js';
import { getUserDoctorByIdController } from '../controllers/users/getUserDoctorByIdController.js';
import { getUserByIdController } from '../controllers/users/getUserByIdController.js';
import { getOwnUserDoctorController } from '../controllers/users/getOwnUserDoctorController.js';
import { getOwnUserController } from '../controllers/users/getOwnUserController.js';
import { userExistsMiddleware } from '../middlewares/userExistsMiddleware.js';
import { editUserInfoController } from '../controllers/users/editUserInfoController.js';
import { editAvatarController} from '../controllers/users/editAvatarController.js';
import { updateUserController } from '../controllers/users/updateUserProfileController.js';
import { getDoctorsBySkillController } from '../controllers/users/getDoctorsBySkillController.js';


export const usersRouter = express.Router();

usersRouter.get(
    '/users/profile',
    authUserMiddleware,
    userExistsMiddleware,
    getOwnUserController
);
usersRouter.post('/users/login', loginUserController);
usersRouter.get('/users/doctors/:id', getUserDoctorByIdController);
usersRouter.post('/users/register', registerUserController);
usersRouter.post('/users/register-doctor', registerDoctorController);
usersRouter.get('/users/doctors', getDoctorsWithRatingsController);
usersRouter.put('/users/updateinfo', authUserMiddleware, editUserInfoController);
usersRouter.put('/users/updateavatar', authUserMiddleware, editAvatarController);

usersRouter.get(
    '/users/doctorsown',
    authUserMiddleware,
    getOwnUserDoctorController
);
usersRouter.put('/users/active/:registrationCode', activeUserController);
usersRouter.put('/users/send-validation-email', sendValidationEmailController);
usersRouter.put('/users/password/edit', editUserPassController);
usersRouter.post('/users/password/recovery', recoveryPassController);
usersRouter.get('/users/:id', getUserByIdController);

usersRouter.get('/doctors/:skillId', getDoctorsBySkillController);

// Nuevo endpoint actualizado
usersRouter.put('/users/updateprofile', authUserMiddleware, updateUserController);

// Ruta para subir archivos
usersRouter.post('/users/upload', uploadMiddleware, (req, res) => {
    res.json({
        message: 'Archivo subido correctamente',
        filePath: req.filePath,
    });
});
