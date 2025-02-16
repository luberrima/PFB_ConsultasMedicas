import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

import { router } from './routes/indexRouter.js';

import { UPLOADS_DIR, FRONTEND_HOST } from '../env.js';
import { bodyParserMiddleware } from './middlewares/bodyParserMiddleware.js';

export const server = express();


/* MIDDLEWARES */
server.use(morgan('dev'));

//bodyParser
server.use(express.json());
server.post('*', bodyParserMiddleware);

>>>>>>> 1c1129c09fba313c68f7447c5bcb78d196233f9c
server.use(fileupload());
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use('/uploads', express.static(uploadsDir));
server.use(cors(/* { origin: FRONTEND_HOST } */));

/* ROUTERS */
server.use(router);

/* errores */
// Gestor de ruta no encontrada 404
server.use((req, res, next) => {
    const resourcePath = req.path
    const error = new Error(`No se encontro el recurso: ${resourcePath}`);
    error.httpStatus = 404;
    error.code = 'RESOURCE_NOT_FOUND';
    //mandamos el error al gestor de errores para que lo saque el.
    next(error)
})

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
