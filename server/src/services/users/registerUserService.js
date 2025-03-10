import { hashPasswordUtil } from '../../utils/hashPasswordUtil.js';
import { generateUUIDUtil } from '../../utils/generateUUIDUtil.js';
import randomstring from 'randomstring';
import { insertUserModel } from '../../models/users/insertUserModel.js';
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { sendEmailBrevoUtils } from '../../utils/sendEmailBrevoUtil.js';

export const registerUserService = async (username, email, password) => {
    
        // Buscar si el usuario ya existe por username
        const userByUsername = await selectUserByUsernameModel(username);
        if (userByUsername) {
            throw genereErrorUtils(
                400,
                'USER_ALREADY_EXISTS',
                'El username ya existe. Prueba con otro o inicia sesión'
            );
        }
    
        // Buscar si el usuario ya existe por email
        const userByEmail = await selectUserByEmailModel(email);
        if (userByEmail) {
            throw genereErrorUtils(
                400,
                'EMAIL_ALREADY_EXISTS',
                'El email ya existe. Prueba con otro o inicia sesión'
            );
        }
    
    
    
    const id = generateUUIDUtil();
    const passwordHash = await hashPasswordUtil(password);
    const registrationCode = randomstring.generate(15);
    const result = await insertUserModel({
        id,
        username,
        email,
        password: passwordHash,
        role: 'paciente',
        registrationCode,
    });
    if (result.affectedRows !== 1) {
        throw genereErrorUtils(
            401,
            'REGISTER_FAILED',
            'No se pudo insertar el usuario'
        );
    }

    // Enviar el mail de confirmación
        // Asunto del email
        const emailSubject = 'Activa tu cuenta de Good Doctor';
        
        // Cuerpo del email
        const emailText = `
        <h2>¡Bienvenid@ ${username} a Good Doctor!</h2>
        <p>Gracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:</p>
        <p><a href="http://localhost:5173/validate/${registrationCode}">Activa tu cuenta</a></p>
        `;
        
        // Llamar al servicio que envía el email
        
        await sendEmailBrevoUtils(email, emailSubject, emailText);
        

    return { id, username, email, registrationCode, role: 'paciente' };
};
