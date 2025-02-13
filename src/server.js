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

server.use(fileupload());
const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
server.use('/uploads', express.static(uploadsDir));
server.use(cors(/* { origin: FRONTEND_HOST } */));

/* ROUTERS */
server.use(router);
