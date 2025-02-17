import express from 'express';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
export const consulRouter = express.Router();


consulRouter.delete('/consul/:id', authUserMiddleware,
    entryExistsMiddleware,
    canDoItMiddleware,
    editEntryController);