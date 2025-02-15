import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import { router } from './routes/indexRouter.js';

import { UPLOADS_DIR, FRONTEND_HOST } from '../env.js';
/*esto es para probar*/
import { uploadMiddleware } from './middlewares/uploadMiddleware.js';
export const server = express();

/* MIDLEWARES */
server.use(morgan('dev'));
server.use(express.json());
server.use(fileupload({ useTempFiles: true, tempFileDir: '/tmp/' })); 
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use('/uploads', express.static(uploadsDir));
server.use(cors(/* { origin: FRONTEND_HOST } */));

/*  RUTA PARA SUBIR ARCHIVOS */
server.post('/upload', uploadMiddleware, (req, res) => {
    res.json({ message: 'Archivo subido con éxito', filePath: req.filePath });
});


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
