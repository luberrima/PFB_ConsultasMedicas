import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

import { router } from './routes/indexRouter.js';

import { UPLOADS_DIR, FRONTEND_HOST } from '../env.js';

export const server = express();

/* MIDLEWARES */
server.use(morgan('dev'));
server.use(express.json());
server.use(fileupload());
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use('/uploads', express.static(uploadsDir));
server.use(cors(/* { origin: FRONTEND_HOST } */));

/* ROUTERS */
server.use(router);

/* errores */




//gestor de errores

server.use((error, req, res, next) => {
    console.error(error);
    //Manda la respuesta predefinida
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: 'ERROR!!!',
        code: error.code || 'INTERNAL _SERVER_ERROR',
        message: error.message
    });
}); 
