import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';


const uploadDir = process.env.UPLOADS_DIR || 'uploads';


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadMiddleware = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    const file = req.files.file;
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    
    
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al subir el archivo', details: err });
        }

        req.filePath = filePath; 
    });
};
