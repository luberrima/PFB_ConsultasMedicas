import express from 'express';
import path from 'path';

export const staticFilesMiddleware = (app) => {
    const uploadsDir = path.join(process.cwd(), 'src', 'Uploads');
    app.use('/uploads', express.static(uploadsDir));
};
