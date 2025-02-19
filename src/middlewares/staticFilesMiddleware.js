import express from 'express';
import path from 'path';

export const staticFilesMiddleware = (app) => {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    app.use('/uploads', express.static(uploadsDir));
    console.log('📂 Middleware de archivos estáticos cargado: /uploads');
};
