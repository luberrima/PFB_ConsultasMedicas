import express from 'express';
import {SECRET_PATH_ADMIN} from '../../env.js'
import { getOwnAdminController } from '../controllers/admin/getOwnAdminController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { validateDoctorByIdController } from '../controllers/admin/validateDoctorByIdController.js';

if (!SECRET_PATH_ADMIN) {
    throw new Error("SECRET_PATH_ADMIN no está definido en las variables de entorno");
}


export const adminRouter = express.Router();


adminRouter.get(`/${SECRET_PATH_ADMIN}`, authUserMiddleware, getOwnAdminController);
adminRouter.put(`/${SECRET_PATH_ADMIN}/validate`, authUserMiddleware, validateDoctorByIdController);