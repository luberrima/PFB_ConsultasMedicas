import express from 'express';
import path from 'path';

export const staticMiddleware = (app) => {
    // Definir la carpeta de archivos estáticos
    const staticDir = path.join(process.cwd(), 'uploads');

    // Servir la carpeta "uploads" como recurso estático accesible desde "/static"
    app.use('/static', express.static(staticDir));

    console.log(`Archivos estáticos disponibles en /static`);
};

