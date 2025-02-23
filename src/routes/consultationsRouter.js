import express from 'express';
import { getConsultationDetailController } from '../controllers/consultations/getConsultationDetailController.js';
import { createReplyController } from '../controllers/consultations/createReplyController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { voteDoctorController } from '../controllers/consultations/voteDoctorController.js';
import { newConsultController } from '../controllers/consultations/newConsultController.js';
import { getAllConsultationController } from '../controllers/consultations/getAllConsultationController.js';
import { consultExistsMiddleware } from '../middlewares/consultExistsMiddleware.js';
import { canDoItMiddleware } from '../middlewares/canDoItMiddleware.js';
import { deleteDiagnistConsultController } from '../controllers/consultations/deleteDiagnistConsultController.js';
import { deleteConsultationController } from '../controllers/consultations/deleteConsultationController.js';
import { editDiagnistConsultController } from '../controllers/consultations/editDiagnistConsultController.js';
import { updateConsultationController } from '../controllers/consultations/updateConsultationController.js';

export const consultationsRouter = express.Router();

consultationsRouter.get(
    '/consultations/:consultationId',

    authUserMiddleware,

    getConsultationDetailController
);
consultationsRouter.post(
    '/consultations/replies',

    authUserMiddleware,

    createReplyController
);

consultationsRouter.put(

    '/consultations/:id/vote',

    authUserMiddleware,

    voteDoctorController
);
consultationsRouter.post(
    '/new-consultation',
    authUserMiddleware,
    newConsultController
);
consultationsRouter.get('/consultations', getAllConsultationController);

consultationsRouter.put(
    '/consultations/removediagnost/:id',
    authUserMiddleware,
    consultExistsMiddleware,
    canDoItMiddleware,
    deleteDiagnistConsultController
);

consultationsRouter.delete(
    '/consultations/:id',
    authUserMiddleware,
    consultExistsMiddleware,
    canDoItMiddleware,
    deleteConsultationController
);
consultationsRouter.put(
    '/consultations/updatediagnost/:id',
    authUserMiddleware,
    consultExistsMiddleware,
    canDoItMiddleware,
    editDiagnistConsultController
);

consultationsRouter.put(
    "/consultations/:id",
    authUserMiddleware,
    consultExistsMiddleware,
    canDoItMiddleware,
    updateConsultationController
);