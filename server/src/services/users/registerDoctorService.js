import { hashPasswordUtil } from '../../utils/hashPasswordUtil.js';
import { generateUUIDUtil } from '../../utils/generateUUIDUtil.js';
import randomstring from 'randomstring';
import { insertUserModel } from '../../models/users/insertUserModel.js';
import { insertDoctorModel } from '../../models/users/insertDoctorModel.js';
import { genereErrorUtils } from '../../utils/genereErrorUtils.js';
import { sendEmailBrevoUtils } from '../../utils/sendEmailBrevoUtil.js';

export const registerDoctorService = async (
    username,
    email,
    password,
    collegeNumber,
    dateOfCollege,
    skillId
) => {
    const userId = generateUUIDUtil();
    const doctorId = generateUUIDUtil();
    const passwordHash = await hashPasswordUtil(password);
    const registrationCode = randomstring.generate(15);

    const userResult = await insertUserModel({
        id: userId,
        username,
        email,
        password: passwordHash,
        role: 'doctor',
        registrationCode,
    });
    if (userResult.affectedRows !== 1) {
        throw genereErrorUtils(
            401,
            'REGISTER_FAILED',
            'No se pudo insertar el usuario doctor'
        );
    }

    const doctorResult = await insertDoctorModel({
        id: doctorId,
        userId,
        collegeNumber,
        dateOfCollege,
        skillId,
    });
    if (doctorResult.affectedRows !== 1) {
        throw genereErrorUtils(
            401,
            'REGISTER_FAILED',
            'No se pudo insertar el usuario doctor'
        );
    }

    // Enviar el mail de confirmación
        // Asunto del email
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


    return { id: userId, username, email, registrationCode, role: 'doctor' };
};
