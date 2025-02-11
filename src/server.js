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

/* ERRORES */
// Ruta no encontrada
server.use((req, res, next) => {
	const resourcePath = req.path;
	const error = new Error(`No se encontro el recurso: ${resourcePath}`);
	error.httpStatus = 404;
	error.code = 'RESOURCE_NOT_FOUND';
	next(error);
});

// Gestor de errores
server.use((error, req, res, next) => {
	console.error(error);
	res.status(error.httpStatus || 500).send({
		httpStatus: error.httpStatus || 500,
		status: 'ERROR!!!',
		code: error.code || 'INTERNAL_SERVER_ERROR',
		message: error.message,
	});
});
