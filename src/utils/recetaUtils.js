import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

import { genereErrorUtils } from './genereErrorUtils.js';
import { createPathUtil } from './foldersUtils.js';

// Función para guardar una foto. Debe recibi: type(avatar, entry), image, width, name
export const saveRecetaUtil = async (userRelativePath, arch, width) => {
    // Crear el directorio
    await createPathUtil(path.join(process.cwd(), userRelativePath));

    // Nombre de la Receta
    const RecipeName = `${crypto.randomUUID()}.jpg`; // Nombre de 36 caracteres aleatorios + 4 de la extensión

    // Ruta de la foto
    const RecipePath = path.join(process.cwd(), userRelativePath, RecipeName);

  
    const archSharp = sharp(arch.data); // Crear un objeto sharp con la imagen
   
    archSharp.resize(width); // Redimensionar la imagen
    
    archSharp.jpeg({ quality: 100 }); // Convertir la imagen a jpeg con calidad 90. El valor por defecto 80
   
    await archSharp.toFile(RecipePath); // Guardar la imagen

    // Lo mismo que las tres líneas anteriores en una sola línea
    // await sharp(image.data).resize(width).toFile(avatarPath);


    return RecipeName;
};

// Función para borrar una foto. Debe recibir: path
export const deleteRecetaUtil = async (RecipePath) => {
    // Borrar la foto
    await fs.unlink(RecipePath, (error) => {
        if (error) {
            throw genereErrorUtils(
                500,
                'DELETE_PHOTO_ERROR',
                `No se ha podido borrar la foto: ${RecipePath}`
            );
        }
    });

};